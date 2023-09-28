import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Formik } from 'formik';
import CDNAConcentration, { CDNAConcentrationProps } from '../../../../src/components/visiumQC/CDNAConentration';
import { slideFactory } from '../../../../src/lib/factories/labwareFactory';
import { LabwareFieldsFragment } from '../../../../src/types/sdk';
import { enableMapSet } from 'immer';
afterEach(() => {
  cleanup();
});
beforeEach(() => {
  enableMapSet();
});
const FormikProps = {
  onSubmit: () => {},
  initialValues: {}
};

const renderCDNAConcentration = (props?: CDNAConcentrationProps) => {
  const inputLabware = slideFactory.build();
  const labware: LabwareFieldsFragment = { ...inputLabware, barcode: inputLabware.barcode ?? '' };

  const initialProps = props ?? {
    slotMeasurements: [
      { address: 'A1', name: 'Cost', value: '0' },
      { address: 'A2', name: 'Cost', value: '0' }
    ],
    labware: labware,
    concentrationComments: [
      { id: 0, text: 'comment 1', enabled: true, category: 'good' },
      { id: 1, text: 'comment 2', enabled: true, category: 'good' }
    ],
    removeLabware: jest.fn()
  };
  return render(
    <Formik {...FormikProps}>
      <CDNAConcentration {...initialProps} />
    </Formik>
  );
};

const getSelect = (dataTestId: string) => {
  const select = screen.getByTestId(dataTestId);
  return within(select).getByRole('combobox', { hidden: true });
};

describe('CDNAConcentration', () => {
  it('renders CDNAConcentration', async () => {
    renderCDNAConcentration();
    await waitFor(() => {
      //Displays labware
      expect(screen.getByTestId('labware')).toBeInTheDocument();
      //Should not display table
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
      //Should display Measurement type
      const measurementType = getSelect('measurementType');
      expect(measurementType).toBeInTheDocument();
      expect(measurementType).toHaveTextContent('');

      fireEvent.keyDown(measurementType, { keyCode: 40 });

      //Selects the dropdown option and close the dropdown options list
      const option1 = screen.getByText('cDNA concentration');
      expect(option1).toBeInTheDocument();
      const option2 = screen.getByText('Library concentration');
      expect(option2).toBeInTheDocument();
    });
  });
  it('displays measurement table when a cDNA concentration measurement type is selected', async () => {
    renderCDNAConcentration();
    await waitFor(() => {
      const measurementType = getSelect('measurementType');
      fireEvent.keyDown(measurementType, { keyCode: 40 });

      //Selects the dropdown option and close the dropdown options list
      const option1 = screen.getByText('cDNA concentration');
      fireEvent.click(option1);
    });
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByTestId('cDNA concentration-input')).toHaveLength(2);
    expect(screen.getByTestId('comments0')).toBeInTheDocument();
    expect(screen.getByTestId('comments1')).toBeInTheDocument();
    expect(screen.getByText('CDNA CONCENTRATION (pg/\u00B5l)')).toBeInTheDocument();
  });
  it('displays measurement table when a Library concentration measurement type is selected', async () => {
    renderCDNAConcentration();
    await waitFor(() => {
      const measurementType = getSelect('measurementType');
      fireEvent.keyDown(measurementType, { keyCode: 40 });

      //Selects the dropdown option and close the dropdown options list
      const option1 = screen.getByText('Library concentration');
      fireEvent.click(option1);
    });
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByTestId('Library concentration-input')).toHaveLength(2);
    expect(screen.getByTestId('comments0')).toBeInTheDocument();
    expect(screen.getByTestId('comments1')).toBeInTheDocument();
    expect(screen.getByText('LIBRARY CONCENTRATION (pg/\u00B5l)')).toBeInTheDocument();
  });
  it('invokes remove function when labware is removed', async () => {
    const inputLabware = slideFactory.build();
    const labware: LabwareFieldsFragment = { ...inputLabware, barcode: inputLabware.barcode ?? '' };
    const removeFunction = jest.fn();
    const initialProps = {
      slotMeasurements: [
        { address: 'A1', name: 'Cost', value: '0' },
        { address: 'A2', name: 'Cost', value: '0' }
      ],
      labware: labware,
      concentrationComments: [
        { id: 0, text: 'comment 1', enabled: true, category: 'good' },
        { id: 1, text: 'comment 2', enabled: true, category: 'good' }
      ],
      removeLabware: removeFunction
    };
    renderCDNAConcentration(initialProps);
    await waitFor(() => {
      const measurementType = getSelect('measurementType');
      fireEvent.keyDown(measurementType, { keyCode: 40 });

      //Selects the dropdown option and close the dropdown options list
      const option1 = screen.getByText('Library concentration');
      fireEvent.click(option1);
    });
    await waitFor(() => {
      const removeButton = screen.getByTestId('remove');
      fireEvent.click(removeButton);
    });
    expect(removeFunction).toHaveBeenCalled();
  });
});
