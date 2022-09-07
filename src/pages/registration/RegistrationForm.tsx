import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GetRegistrationInfoQuery, LabwareType, LifeStage } from '../../types/sdk';
import { FieldArray, Form, useFormikContext } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import Heading from '../../components/Heading';
import FormikInput from '../../components/forms/Input';
import RadioGroup, { RadioButton } from '../../components/forms/RadioGroup';
import { objectKeys } from '../../lib/helpers';
import FormikSelect from '../../components/forms/Select';
import { optionValues } from '../../components/forms';
import PinkButton from '../../components/buttons/PinkButton';
import BlueButton from '../../components/buttons/BlueButton';
import SummaryBox from './SummaryBox';
import variants from '../../lib/motionVariants';
import GrayBox, { Sidebar } from '../../components/layouts/GrayBox';
import { useScrollToRef } from '../../lib/hooks';
import { RegistrationFormValues } from '../BlockRegistration';
import { TissueValues } from './Registration';
export type TextType = 'Block' | 'Embedding';

interface RegistrationFormParams<T> {
  /**
   * Registration information like available species,fixatives etc
   */
  registrationInfo: GetRegistrationInfoQuery;
  /**
   * Labware types available for registration
   */
  availableLabwareTypes: LabwareType[];
  /**
   * Default values for Tissue
   */
  defaultFormTissueValues: T;
  /**
   * Change in default keywords to display
   */
  keywordsMap?: Map<TextType, string>;
}

const RegistrationForm = <T extends TissueValues<B>, B>({
  registrationInfo,
  availableLabwareTypes,
  defaultFormTissueValues,
  keywordsMap
}: RegistrationFormParams<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setFieldValue, values, errors, touched, isSubmitting } = useFormikContext<RegistrationFormValues>();

  const keywords = keywordsMap ?? new Map();
  const optionalFields = keywords.has('Optional') && keywords.get('Optional');

  // Available spatial locations are determined by the current tissue type
  const availableSpatialLocations: GetRegistrationInfoQuery['tissueTypes'][number]['spatialLocations'] = useMemo(() => {
    return (
      registrationInfo.tissueTypes.find((tt) => tt.name === values.tissues[currentIndex].tissueType)
        ?.spatialLocations ?? []
    );
  }, [registrationInfo.tissueTypes, values.tissues, currentIndex]);

  // Only enable HMDMC when the species is Human
  const isHMDMCEnabled = values.tissues[currentIndex].species === 'Human';
  useEffect(() => {
    if (!isHMDMCEnabled) {
      setFieldValue(`tissues.${currentIndex}.hmdmc`, '', true);
    }
  }, [isHMDMCEnabled, setFieldValue, currentIndex]);

  // Reference to the current Tissue being registered
  const tissueRef = useRef<HTMLDivElement>(null);

  const [lastBlockRef, scrollToLatestBlock] = useScrollToRef();

  const getOptionalTag = (fieldName: string) =>
    optionalFields && optionalFields.includes(fieldName) ? 'Optional' : undefined;

  return (
    <Form>
      <GrayBox>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => {
            setFieldValue(
              'tissues',
              values.tissues.filter((t) => !!t.clientId)
            );
          }}
        >
          <motion.div
            ref={tissueRef}
            variants={variants.fadeInParent}
            initial={'hidden'}
            animate={'visible'}
            exit={'hidden'}
            className="md:w-2/3 space-y-6"
            key={values.tissues[currentIndex].clientId}
          >
            <motion.div variants={variants.fadeInWithLift} className="space-y-4">
              <Heading level={3}>Donor Information</Heading>

              <FormikInput label="Donor ID" name={`tissues.${currentIndex}.donorId`} />

              <RadioGroup label="Life Stage" name={`tissues.${currentIndex}.lifeStage`}>
                {objectKeys(LifeStage).map((key, index) => {
                  return <RadioButton key={index} name={key} value={LifeStage[key]} />;
                })}
              </RadioGroup>

              {values.tissues[currentIndex].lifeStage === LifeStage.Fetal && (
                <FormikInput
                  type="date"
                  name={`tissues.${currentIndex}.sampleCollectionDate`}
                  label={'Sample Collection Date'}
                  max={new Date()}
                />
              )}

              <FormikSelect label={'Species'} name={`tissues.${currentIndex}.species`} emptyOption className="mt-2">
                {optionValues(registrationInfo.species, 'name', 'name')}
              </FormikSelect>
            </motion.div>

            <motion.div variants={variants.fadeInWithLift} className="space-y-4">
              <Heading level={3}>Tissue Information</Heading>

              <FormikSelect
                label="HuMFre"
                name={`tissues.${currentIndex}.hmdmc`}
                disabled={!isHMDMCEnabled}
                emptyOption
                className="mt-2"
              >
                {optionValues(registrationInfo.hmdmcs, 'hmdmc', 'hmdmc')}
              </FormikSelect>

              <FormikSelect
                label="Tissue Type"
                emptyOption
                name={`tissues.${currentIndex}.tissueType`}
                className="mt-2"
              >
                {optionValues(registrationInfo.tissueTypes, 'name', 'name')}
              </FormikSelect>
            </motion.div>

            <motion.div variants={variants.fadeInWithLift} className="space-y-4">
              <Heading level={3}>{`${keywords.get('Block') ?? 'Block'} Information`}</Heading>
              <AnimatePresence
                onExitComplete={() => {
                  setFieldValue(
                    `tissues.[${currentIndex}].blocks`,
                    values.tissues[currentIndex].blocks.filter((block) => block.clientId !== null)
                  );
                }}
              >
                {values.tissues[currentIndex].blocks
                  .filter((block) => block.clientId !== null)
                  .flatMap((block, blockIndex) => {
                    return (
                      <motion.div
                        ref={blockIndex === values.tissues[currentIndex].blocks.length - 1 ? lastBlockRef : null}
                        key={block.clientId}
                        variants={variants.fadeIn}
                        animate={'visible'}
                        exit={'hidden'}
                        className="relative p-4 shadow-lg bg-white space-y-4"
                      >
                        <FormikInput
                          label="External Identifier"
                          name={`tissues.${currentIndex}.blocks.${blockIndex}.externalIdentifier`}
                          displayTag={getOptionalTag('External Identifier')}
                        />

                        <FormikSelect
                          disabled={availableSpatialLocations.length === 0}
                          emptyOption={availableSpatialLocations.length > 0}
                          label="Spatial Location"
                          name={`tissues.${currentIndex}.blocks.${blockIndex}.spatialLocation`}
                        >
                          {availableSpatialLocations.map((spatialLocation) => (
                            <option value={spatialLocation.code} key={spatialLocation.code}>
                              {spatialLocation.code + ' - ' + spatialLocation.name}
                            </option>
                          ))}
                        </FormikSelect>

                        <FormikInput
                          label="Replicate Number"
                          name={`tissues.${currentIndex}.blocks.${blockIndex}.replicateNumber`}
                          displayTag={getOptionalTag('Replicate Number')}
                        />
                        {'lastKnownSectionNumber' in values.tissues[currentIndex].blocks[blockIndex] && (
                          <FormikInput
                            label="Last Known Section Number"
                            type="number"
                            name={`tissues.${currentIndex}.blocks.${blockIndex}.lastKnownSectionNumber`}
                          />
                        )}

                        <FormikSelect
                          emptyOption
                          label="Labware Type"
                          name={`tissues.${currentIndex}.blocks.${blockIndex}.labwareType`}
                        >
                          {optionValues(availableLabwareTypes, 'name', 'name')}
                        </FormikSelect>

                        <Heading level={4} showBorder={false} className="mt-4">
                          {`${keywords.get('Embedding') ?? 'Embedding'} Information`}
                        </Heading>

                        <FormikSelect
                          emptyOption
                          label="Fixative"
                          className="block mt-2"
                          name={`tissues.${currentIndex}.blocks.${blockIndex}.fixative`}
                        >
                          {optionValues(registrationInfo.fixatives, 'name', 'name')}
                        </FormikSelect>
                        {'medium' in block && (
                          <FormikSelect
                            emptyOption
                            label="Medium"
                            className="block mt-2"
                            name={`tissues.${currentIndex}.blocks.${blockIndex}.medium`}
                          >
                            {optionValues(registrationInfo.mediums, 'name', 'name')}
                          </FormikSelect>
                        )}
                        {'solution' in block && (
                          <FormikSelect
                            emptyOption
                            label="Solution"
                            className="block mt-2"
                            name={`tissues.${currentIndex}.blocks.${blockIndex}.solution`}
                          >
                            {optionValues(registrationInfo.solutions, 'name', 'name')}
                          </FormikSelect>
                        )}
                        <div className={'flex flex-row justify-end'}>
                          {'solution' in block && (
                            <FieldArray name={`tissues.${currentIndex}.blocks`}>
                              {(blockHelpers) => (
                                <BlueButton
                                  type="button"
                                  action="secondary"
                                  className="mt-4 inline-flex"
                                  onClick={() => {
                                    //Create new sample fields refilled with the sample from which this is invoked. Reset Solution,Fixative and Replicate Number fields
                                    blockHelpers.push(block);
                                    setFieldValue(
                                      `tissues[${currentIndex}].blocks[${values.tissues[currentIndex].blocks.length}].solution`,
                                      ''
                                    );
                                    setFieldValue(
                                      `tissues[${currentIndex}].blocks[${values.tissues[currentIndex].blocks.length}].fixative`,
                                      ''
                                    );
                                    setFieldValue(
                                      `tissues[${currentIndex}].blocks[${values.tissues[currentIndex].blocks.length}].replicateNumber`,
                                      ''
                                    );
                                    scrollToLatestBlock();
                                  }}
                                >
                                  {`+ Add Identical Tissue ${keywords.get('Block') ?? 'Block'}`}
                                </BlueButton>
                              )}
                            </FieldArray>
                          )}

                          {/* Only show the delete button if we've got more than 1 block */}
                          {values.tissues[currentIndex].blocks.length > 1 && (
                            <div className="flex justify-end">
                              <FieldArray name={`tissues.${currentIndex}.blocks`}>
                                {(blockHelpers) => (
                                  <PinkButton
                                    type="button"
                                    action="tertiary"
                                    onClick={() => {
                                      blockHelpers.remove(blockIndex);
                                    }}
                                  >
                                    {`Delete ${keywords.get('Block') ?? 'Block'}`}
                                  </PinkButton>
                                )}
                              </FieldArray>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </motion.div>

            <motion.div variants={variants.fadeInWithLift} className="flex flex-row items-centre justify-between">
              <FieldArray name={`tissues.${currentIndex}.blocks`}>
                {(blockHelpers) => (
                  <BlueButton
                    type="button"
                    action="secondary"
                    className="mt-4 inline-flex"
                    onClick={() => {
                      blockHelpers.push(defaultFormTissueValues.blocks[0]);
                      scrollToLatestBlock();
                    }}
                  >
                    {`+ Add Another Tissue ${keywords.get('Block') ?? 'Block'}`}
                  </BlueButton>
                )}
              </FieldArray>

              {/* Only show the delete button if we've got more than one Tissue */}
              {values.tissues.length > 1 && (
                <PinkButton
                  type="button"
                  action="secondary"
                  className="mt-4 inline-flex"
                  onClick={async () => {
                    setFieldValue(`tissues[${currentIndex}].clientId`, null);
                    if (currentIndex > 0) {
                      setCurrentIndex(currentIndex - 1);
                    }
                    tissueRef.current?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  - Remove Tissue
                </PinkButton>
              )}
            </motion.div>
          </motion.div>
          )
        </AnimatePresence>

        <Sidebar>
          <FieldArray name={`tissues`}>
            {(tissueHelpers) => (
              <SummaryBox
                submitting={isSubmitting}
                values={values}
                errors={errors}
                touched={touched}
                currentFormIndex={currentIndex}
                setCurrentFormIndex={setCurrentIndex}
                onNewTissueButton={() => {
                  tissueHelpers.push(defaultFormTissueValues);
                  setCurrentIndex(currentIndex + 1);
                  tissueRef.current?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                keywordsMap={keywordsMap}
              />
            )}
          </FieldArray>
        </Sidebar>
      </GrayBox>
    </Form>
  );
};

export default RegistrationForm;
