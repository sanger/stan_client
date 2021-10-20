import { OperationType } from "./analysisLabware";
import { enumValue } from "../../lib/helpers";
import React from "react";
import { RnaAnalysisLabware, StringMeasurement } from "../../types/sdk";
import { Row } from "react-table";

export enum AnalysisMeasurementType {
  RIN = "RIN",
  DV200 = "DV200",
  DV200_LOWER = "DV200 lower",
  DV200_UPPER = "DV200 upper",
}
export enum MeasurementValueCategory {
  SINGLE_VALUE_TYPE = "Single",
  RANGE_VALUE_TYPE = "Range",
  NA_TYPE = "N/A",
}
export const measurementColumn = (
  operationType: string,
  onChangeMeasurementCategory: (barcode: string, value: string) => void,
  onChangeMeasurementValue: (
    barcode: string,
    value: string,
    type: string
  ) => void
) => {
  const getValueCategoryKeys = (operationType: string) => {
    if (operationType === OperationType.DV200) {
      return Object.keys(MeasurementValueCategory);
    } else {
      return Object.keys(MeasurementValueCategory).filter(
        (key) =>
          enumValue(MeasurementValueCategory, key) !==
          MeasurementValueCategory.RANGE_VALUE_TYPE
      );
    }
  };

  const MeasurementCategoryTypeSelect = ({
    barcode,
    operationType,
    onChangeMeasurementCategory,
  }: {
    barcode: string;
    operationType: string;
    onChangeMeasurementCategory: (eventType: string, value: string) => void;
  }) => {
    return (
      <select
        className={"rounded-md"}
        onChange={(e) =>
          onChangeMeasurementCategory(
            barcode,
            e.currentTarget.value === MeasurementValueCategory.NA_TYPE
              ? ""
              : e.currentTarget.value
          )
        }
      >
        {getValueCategoryKeys(operationType).map((key) => (
          <option value={enumValue(MeasurementValueCategory, key)} key={key}>
            {enumValue(MeasurementValueCategory, key)}
          </option>
        ))}
      </select>
    );
  };

  const isRangeType = (measurements: StringMeasurement[]) => {
    if (!measurements || measurements.length <= 0) return false;
    return (
      measurements[0].name === AnalysisMeasurementType.DV200_LOWER ||
      measurements[0].name === AnalysisMeasurementType.DV200_UPPER
    );
  };

  const MeasurementInput = ({
    barcode,
    measurement,
    onChangeMeasurementValue,
    labelText,
    min,
  }: {
    barcode: string;
    measurement: StringMeasurement | undefined;
    onChangeMeasurementValue: (
      barcode: string,
      value: string,
      type: string
    ) => void;
    labelText?: string;
    min?: number;
  }) => {
    return (
      <>
        {labelText && (
          <label className="text-gray-400 text-xs mr-2 ">{labelText}</label>
        )}
        <input
          className={`rounded-md ${
            !measurement && "bg-gray-200 border-gray-50"
          }`}
          type="number"
          defaultValue={measurement?.value}
          onFocus={(e) => {
            e.target.style.color = "black";
            if (min && Number(e.currentTarget.value) < min) {
              e.target.style.color = "red";
            }
          }}
          onChange={(e) => {
            e.target.style.color = "black";
            if (min && Number(e.currentTarget.value) < min) {
              e.target.style.color = "red";
            }
            onChangeMeasurementValue(
              barcode,
              e.currentTarget.value,
              measurement ? measurement.name : ""
            );
          }}
          disabled={!measurement}
          step={".1"}
          min={min ?? 0}
        />
      </>
    );
  };

  return {
    Header: `${operationType} Value`,
    id: "value",
    columns: [
      {
        Header: "Type",
        id: "type",
        Cell: ({ row }: { row: Row<RnaAnalysisLabware> }) => {
          return (
            <MeasurementCategoryTypeSelect
              barcode={row.original.barcode}
              operationType={operationType}
              onChangeMeasurementCategory={onChangeMeasurementCategory}
            />
          );
        },
      },
      {
        Header: "Result",
        id: "result",
        Cell: ({ row }: { row: Row<RnaAnalysisLabware> }) => {
          return (
            <div className={"flex flex-col"}>
              <div
                className={`${row.original.measurements.length > 1 && "mt-2"}`}
              >
                <MeasurementInput
                  barcode={row.original.barcode}
                  measurement={
                    row.original.measurements.length > 0
                      ? row.original.measurements[0]
                      : undefined
                  }
                  onChangeMeasurementValue={onChangeMeasurementValue}
                  labelText={
                    isRangeType(row.original.measurements)
                      ? "Lower bound (%)"
                      : undefined
                  }
                />
              </div>
              {isRangeType(row.original.measurements) && (
                <div className={"mt-2"}>
                  <MeasurementInput
                    barcode={row.original.barcode}
                    measurement={
                      row.original.measurements.length > 1
                        ? row.original.measurements[1]
                        : undefined
                    }
                    onChangeMeasurementValue={onChangeMeasurementValue}
                    labelText={
                      isRangeType(row.original.measurements)
                        ? "Upper bound (%)"
                        : undefined
                    }
                    min={
                      row.original.measurements.length > 1
                        ? Number(row.original.measurements[0].value) + 1
                        : 0
                    }
                  />
                </div>
              )}
            </div>
          );
        },
      },
    ],
  };
};
