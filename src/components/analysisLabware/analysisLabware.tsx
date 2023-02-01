import { Form, Formik } from 'formik';
import React, { useCallback } from 'react';
import Heading from '../Heading';
import { CommentFieldsFragment, RnaAnalysisLabware } from '../../types/sdk';
import { Row } from 'react-table';
import { motion } from 'framer-motion';
import DataTable from '../DataTable';
import { useMachine } from '@xstate/react';
import { analysisLabwareMachine } from './analysisLabware.machine';
import { AnalysisMeasurementType, measurementColumn } from './measurementColumn';
import { objectKeys } from '../../lib/helpers';
import WorkNumberSelect from '../WorkNumberSelect';
import CustomReactSelect, { OptionType } from '../forms/CustomReactSelect';
import { selectOptionValues } from '../forms';

type RecordAnalysisProps = {
  barcodes: string[];
  comments: CommentFieldsFragment[];
  analysisLabwares: RnaAnalysisLabware[];
  onChangeLabwareData: (operationType: string, labwares: RnaAnalysisLabware[]) => void;
};
export enum OperationType {
  RIN = 'RIN analysis',
  DV200 = 'DV200 analysis'
}

export default function AnalysisLabware({ barcodes, comments, onChangeLabwareData }: RecordAnalysisProps) {
  const defaultLabwareValues = barcodes.map((barcode) => {
    return {
      barcode: barcode,
      measurements: [{ name: AnalysisMeasurementType.RIN, value: '' }],
      workNumber: ''
    };
  });

  const workNumberCommon = React.useRef('');

  const memoAnalysisLabwareMachine = React.useMemo(() => {
    return analysisLabwareMachine.withContext({
      analysisLabwares: defaultLabwareValues,
      operationType: OperationType.RIN
    });
  }, [defaultLabwareValues]);

  const [current, send] = useMachine(() => memoAnalysisLabwareMachine);
  const { operationType, analysisLabwares } = current.context;

  React.useEffect(() => {
    onChangeLabwareData(operationType, analysisLabwares);
  }, [analysisLabwares, onChangeLabwareData, operationType]);

  const handleOnChange = useCallback(
    (barcode: string, fieldname: string, value: string, measurementType?: string) => {
      send({
        type: 'UPDATE_LABWARE_DATA',
        labware: {
          barcode: barcode,
          field: fieldname,
          value: value,
          measurementType: measurementType
        }
      });
    },
    [send]
  );
  const onChangeMeasurementCategory = useCallback(
    (barcode: string, value: string) => {
      send({ type: 'UPDATE_MEASUREMENT_TYPE', barcode: barcode, value: value });
    },
    [send]
  );

  const onChangeMeasurementValue = useCallback(
    (barcode: string, value: string, type: string) => {
      handleOnChange(barcode, 'measurements', value, type);
    },
    [handleOnChange]
  );

  const columns = React.useMemo(() => {
    return [
      {
        Header: 'Barcode',
        id: 'barcode',
        accessor: (labware: RnaAnalysisLabware) => labware.barcode
      },
      {
        Header: 'SGP Number',
        id: 'workNumber',
        Cell: ({ row }: { row: Row<RnaAnalysisLabware> }) => {
          return (
            <WorkNumberSelect
              onWorkNumberChange={(workNumber) => handleOnChange(row.original.barcode, 'workNumber', workNumber ?? '')}
              workNumber={row.original.workNumber ? row.original.workNumber : ''}
            />
          );
        }
      },
      measurementColumn(operationType, onChangeMeasurementCategory, onChangeMeasurementValue),
      {
        Header: 'Comment',
        id: 'comment',
        Cell: ({ row }: { row: Row<RnaAnalysisLabware> }) => {
          return (
            <CustomReactSelect
              className={'rounded-md'}
              value={row.original.commentId && row.original.commentId > 0 ? String(row.original.commentId) : ''}
              emptyOption
              handleChange={(value) => handleOnChange(row.original.barcode, 'comment', (value as OptionType).value)}
              options={selectOptionValues(comments, 'text', 'id')}
            />
          );
        }
      }
    ];
  }, [operationType, comments, handleOnChange, onChangeMeasurementCategory, onChangeMeasurementValue]);

  return (
    <div className="max-w-screen-xl mx-auto">
      <Heading level={3}> Analysis</Heading>
      <Formik initialValues={barcodes} onSubmit={() => {}}>
        <Form>
          <div className="md:grid mt-4 md:grid-cols-3 md:space-y-0 md:gap-4 space-y-2 mb-8">
            <div className="">
              <CustomReactSelect
                label={'Type'}
                dataTestId={'analysisType'}
                name={'type'}
                emptyOption={false}
                handleChange={(value) => {
                  send({
                    type: 'UPDATE_ANALYSIS_TYPE',
                    value: (value as OptionType).label
                  });
                }}
                options={objectKeys(OperationType).map((type) => {
                  return {
                    value: type,
                    label: type
                  };
                })}
              />
            </div>
            <div className="mt-4">
              <div>SGP Number</div>
              <WorkNumberSelect
                onWorkNumberChange={(workNumber) => {
                  send({
                    type: 'UPDATE_ALL_WORKNUMBERS',
                    workNumber: workNumber ?? ''
                  });
                  workNumberCommon.current = workNumber ?? '';
                }}
                workNumber={workNumberCommon.current}
              />
            </div>
            <div className="">
              <CustomReactSelect
                label={'Comment'}
                name={'comment'}
                dataTestId={'comment'}
                emptyOption
                valueAsNumber
                handleChange={(val) => {
                  send({
                    type: 'UPDATE_ALL_COMMENTS_TYPE',
                    commentId: (val as OptionType).value
                  });
                }}
                options={selectOptionValues(comments, 'text', 'id')}
              />
            </div>
          </div>
        </Form>
      </Formik>
      {barcodes.length > 0 && (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <DataTable columns={columns} data={analysisLabwares} />
        </motion.div>
      )}
    </div>
  );
}
