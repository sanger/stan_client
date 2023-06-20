import {
  act,
  cleanup,
  fireEvent,
  getAllByTestId,
  getByTestId,
  getByText,
  render,
  RenderResult,
  screen,
  waitFor
} from '@testing-library/react';
import { within } from '@testing-library/dom';
import SlotMapper from '../../../../src/components/slotMapper/SlotMapper';
import { SlotCopyMode } from '../../../../src/components/slotMapper/slotMapper.types';
import { objectKeys } from '../../../../src/lib/helpers';
import React from 'react';
import { plateFactory } from '../../../../src/lib/factories/labwareFactory';
import { LabwareFieldsFragment } from '../../../../src/types/sdk';
import { enableMapSet } from 'immer';
import { getById } from '../../generic/utilities';
import Labware from '../../../../src/components/labware/Labware';

beforeEach(() => {
  enableMapSet();
});

afterEach(() => {
  cleanup();
});

describe('slotMapper.spec.tsx', () => {
  it('should render the component properly', () => {
    const wrapper = render(<SlotMapper slotCopyModes={objectKeys(SlotCopyMode).map((key) => SlotCopyMode[key])} />);
    //It should display the given slot copy modes
    expect(screen.queryByTestId('copyMode-Many to one')).toBeInTheDocument();
    expect(screen.queryByTestId('copyMode-One to many')).toBeInTheDocument();
    expect(screen.queryByTestId('copyMode-One to one')).toBeInTheDocument();

    //It should display the input and output labwares
    expect(screen.getByText('Input Labwares')).toBeInTheDocument();
    expect(screen.getByText('Output Labwares')).toBeInTheDocument();
  });
  it('displays the correct number of input and output labwares', () => {
    const inputLabware = plateFactory.build({ barcode: 'STAN-3111' });
    //Convert  NewLabwareLayout to LabwareFieldsFragment
    const labware: LabwareFieldsFragment = { ...inputLabware, barcode: inputLabware.barcode ?? '' };
    const wrapper = render(
      <SlotMapper
        slotCopyModes={objectKeys(SlotCopyMode).map((key) => SlotCopyMode[key])}
        initialInputLabware={[labware]}
      />
    );
    expect(getById(wrapper.container, 'inputLabwares')).toBeInTheDocument();
    //It should display the default output labware by id
    expect(getById(wrapper.container, 'outputLabwares')).toBeInTheDocument();
  });

  it('displays multiple input  labware from props', () => {
    const inputLabware = plateFactory.build();
    //Convert  NewLabwareLayout to LabwareFieldsFragment
    const labware: LabwareFieldsFragment[] = [
      { ...inputLabware, barcode: 'STAN-5111' },
      { ...inputLabware, barcode: 'STAN-5112' }
    ];
    const { container } = render(
      <SlotMapper
        slotCopyModes={objectKeys(SlotCopyMode).map((key) => SlotCopyMode[key])}
        initialInputLabware={labware}
      />
    );

    const pagerTexts = getAllByTestId(container, 'pager-text-div');
    expect(pagerTexts[0]).toHaveTextContent('1 of 2');
  });
  it('displays multiple input labware on scan', async () => {
    act(() => {
      render(<SlotMapper slotCopyModes={objectKeys(SlotCopyMode).map((key) => SlotCopyMode[key])} />);
    });
    const inputs = (await screen.getAllByTestId('input')) as HTMLInputElement[];
    await waitFor(() => {
      fireEvent.change(inputs[0], { target: { value: 'STAN-5111' } });
    });
  });

  it('removes input labware on remove button click', async () => {
    const inputLabware = plateFactory.build();
    //Convert  NewLabwareLayout to LabwareFieldsFragment
    const labware: LabwareFieldsFragment[] = [
      { ...inputLabware, barcode: 'STAN-5111' },
      { ...inputLabware, barcode: 'STAN-5112' }
    ];
    act(() => {
      render(
        <SlotMapper
          slotCopyModes={objectKeys(SlotCopyMode).map((key) => SlotCopyMode[key])}
          initialInputLabware={labware}
        />
      );
    });
    await act(async () => {
      fireEvent.click(screen.getAllByTestId('removeButton')[0]);
    });
    const pagerTexts = screen.getAllByTestId('pager-text-div');
    expect(pagerTexts[0]).toHaveTextContent('1 of 1');
  });
  it('displays previous and next input labware on previous and next button clicks', async () => {
    const inputLabware = plateFactory.build();
    //Convert  NewLabwareLayout to LabwareFieldsFragment
    const labware: LabwareFieldsFragment[] = [
      { ...inputLabware, barcode: 'STAN-5111' },
      { ...inputLabware, barcode: 'STAN-5112' }
    ];
    act(() => {
      render(
        <SlotMapper
          slotCopyModes={objectKeys(SlotCopyMode).map((key) => SlotCopyMode[key])}
          initialInputLabware={labware}
        />
      );
    });
    const pagerTexts = screen.getAllByTestId('pager-text-div');
    expect(pagerTexts[0]).toHaveTextContent('1 of 2');

    await act(async () => {
      fireEvent.click(screen.getByTestId('right-button'));
    });
    expect(pagerTexts[0]).toHaveTextContent('2 of 2');

    await act(async () => {
      fireEvent.click(screen.getByTestId('left-button'));
    });
    expect(pagerTexts[0]).toHaveTextContent('1 of 2');
  });
  it('displays slot information in table when user selects source slots', async () => {
    const inputLabware = plateFactory.build();
    //Convert  NewLabwareLayout to LabwareFieldsFragment
    const labware: LabwareFieldsFragment[] = [{ ...inputLabware, barcode: 'STAN-5111' }];
    let wrapper: RenderResult | undefined;
    jest.mock('../../../../src/components/labware/Labware', () => ({
      onSelect: (address: string[], callback: any) => callback('someData')
    }));

    act(() => {
      wrapper = render(
        <SlotMapper
          slotCopyModes={objectKeys(SlotCopyMode).map((key) => SlotCopyMode[key])}
          initialInputLabware={labware}
        />
      );
    });
    expect(wrapper?.container).toBeInTheDocument();
    //Select the first slot A1 in input labware
    const inputLabwareElement = getById(wrapper?.container!, 'inputLabwares');
    expect(inputLabwareElement).toBeInTheDocument();

    expect(getByText(inputLabwareElement!, 'A1')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(getByText(inputLabwareElement!, 'A1'));
    });
    expect(onSelect.mock.calls[0][0]).toBe('firstParameter');
    //It should display a table with column A1
    //const table = screen.getByTestId('mapping-div');
    //expect(table).toBeInTheDocument();
    //expect((wrapper?.container!).toHaveTextContent('Slot mapping for slot(s) A1');
    //expect(within(table).getByText('A1')).toBeInTheDocument();*/
  });
});
