import React from "react";
import AppShell from "../components/AppShell";
import {
  EquipmentFieldsFragment,
  InPlaceOpRequest,
  RecordInPlaceMutation,
} from "../types/sdk";
import { Form, Formik } from "formik";
import GrayBox, { Sidebar } from "../components/layouts/GrayBox";
import { motion } from "framer-motion";
import variants from "../lib/motionVariants";
import Warning from "../components/notifications/Warning";
import Heading from "../components/Heading";
import WorkNumberSelect from "../components/WorkNumberSelect";
import { FormikErrorMessage, optionValues } from "../components/forms";
import LabwareScanner from "../components/labwareScanner/LabwareScanner";
import LabwareScanPanel from "../components/labwareScanPanel/LabwareScanPanel";
import columns from "../components/dataTable/labwareColumns";
import FormikSelect from "../components/forms/Select";
import PinkButton from "../components/buttons/PinkButton";
import * as Yup from "yup";
import { useMachine } from "@xstate/react";
import createFormMachine from "../lib/machines/form/formMachine";
import { reload, stanCore } from "../lib/sdk";
import OperationCompleteModal from "../components/modal/OperationCompleteModal";

type RecordInPlaceProps = {
  /**
   * The title of the page
   */
  title: string;

  /**
   * The name of the operation that is being performed
   */
  operationType: string;

  /**
   * The equipment available for this operation
   */
  equipment: Array<EquipmentFieldsFragment>;
};

type RecordInPlaceForm = InPlaceOpRequest;

export default function RecordInPlace({
  title,
  operationType,
  equipment,
}: RecordInPlaceProps) {
  const [current, send] = useMachine(
    createFormMachine<InPlaceOpRequest, RecordInPlaceMutation>().withConfig({
      services: {
        submitForm: (ctx, e) => {
          if (e.type !== "SUBMIT_FORM") return Promise.reject();
          return stanCore.RecordInPlace({ request: e.values });
        },
      },
    })
  );

  const { serverError } = current.context;

  /**
   * Validation schema for the form
   */
  const validationSchema = Yup.object().shape({
    barcodes: Yup.array()
      .of(Yup.string().required())
      .min(1)
      .required()
      .label("Labware"),
    equipmentId: Yup.number()
      .oneOf(equipment.map((e) => e.id))
      .optional()
      .label("Equipment"),
    operationType: Yup.string().required().label("Operation Type"),
    workNumber: Yup.string().optional().label("SGP Number"),
  });

  /**
   * Initial values of the form
   */
  const initialValues: RecordInPlaceForm = {
    operationType,
    barcodes: [],
    equipmentId: undefined,
    workNumber: undefined,
  };

  return (
    <AppShell>
      <AppShell.Header>
        <AppShell.Title>{title}</AppShell.Title>
      </AppShell.Header>
      <AppShell.Main>
        <div className="max-w-screen-xl mx-auto">
          <Formik<RecordInPlaceForm>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              send({ type: "SUBMIT_FORM", values });
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <GrayBox>
                  <motion.div
                    variants={variants.fadeInParent}
                    initial={"hidden"}
                    animate={"visible"}
                    exit={"hidden"}
                    className="md:w-2/3 space-y-10"
                  >
                    {serverError && <Warning error={serverError} />}

                    <motion.div
                      variants={variants.fadeInWithLift}
                      className="space-y-4"
                    >
                      <Heading level={3}>SGP Number</Heading>

                      <WorkNumberSelect
                        onWorkNumberChange={(workNumber) =>
                          setFieldValue("workNumber", workNumber)
                        }
                      />
                      <FormikErrorMessage name={"workNumber"} />
                    </motion.div>

                    <motion.div
                      variants={variants.fadeInWithLift}
                      className="space-y-4"
                    >
                      <Heading level={3}>Labware</Heading>

                      <LabwareScanner
                        onChange={(labwares) =>
                          setFieldValue(
                            "barcodes",
                            labwares.map((lw) => lw.barcode)
                          )
                        }
                        locked={current.matches("submitted")}
                      >
                        <LabwareScanPanel
                          columns={[
                            columns.barcode(),
                            columns.donorId(),
                            columns.labwareType(),
                            columns.externalName(),
                            columns.bioState(),
                          ]}
                        />
                      </LabwareScanner>
                      <FormikErrorMessage name={"barcodes"} />
                    </motion.div>

                    {equipment.length > 0 && (
                      <motion.div
                        variants={variants.fadeInWithLift}
                        className="space-y-4"
                      >
                        <Heading level={3}>Equipment</Heading>

                        <FormikSelect
                          disabled={current.matches("submitted")}
                          label={"Equipment"}
                          name={"equipmentId"}
                          emptyOption
                          onChange={(
                            e: React.ChangeEvent<HTMLSelectElement>
                          ) => {
                            setFieldValue(
                              "equipmentId",
                              e.target.value === ""
                                ? undefined
                                : parseInt(e.target.value, 10)
                            );
                          }}
                        >
                          {optionValues(equipment, "name", "id")}
                        </FormikSelect>
                      </motion.div>
                    )}
                  </motion.div>

                  <Sidebar>
                    <Heading level={3} showBorder={false}>
                      Summary
                    </Heading>

                    {values.workNumber ? (
                      <p>
                        The selected SGP number is{" "}
                        <span className="font-semibold">
                          {values.workNumber}
                        </span>
                        .
                      </p>
                    ) : (
                      <p className="text-sm italic">No SGP number selected.</p>
                    )}

                    <PinkButton
                      disabled={current.matches("submitted")}
                      loading={current.matches("submitting")}
                      type="submit"
                      className="sm:w-full"
                    >
                      Submit
                    </PinkButton>
                  </Sidebar>
                </GrayBox>
              </Form>
            )}
          </Formik>

          <OperationCompleteModal
            show={current.matches("submitted")}
            message={"Operation Complete"}
            onReset={reload}
          >
            <p>
              If you wish to start the process again, click the "Reset Form"
              button. Otherwise you can return to the Home screen.
            </p>
          </OperationCompleteModal>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
