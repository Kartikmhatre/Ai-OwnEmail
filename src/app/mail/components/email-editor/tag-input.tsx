import * as React from 'react';
import { useState } from 'react';
import Avatar from 'react-avatar';
import Select from 'react-select';

type TagInputProps = {
    suggestions: string[];
    defaultValues?: { label: string, value: string }[];
    placeholder: string;
    label: string;

    onChange: (values: { label: string, value: string }[]) => void;
    value: { label: string, value: string }[];
};

const TagInput: React.FC<TagInputProps> = ({ suggestions, defaultValues = [], label, onChange, value }: TagInputProps) => {
    const [input, setInput] = useState('');

    const options = suggestions.map((suggestion: string) => ({
        label: suggestion,
        value: suggestion
    }));

    const formatOptionLabel = (option: { label: string; value: string }) => (
        <span className='flex items-center gap-2'>
            <Avatar name={option.value} size='25' textSizeRatio={2} round={true} />
            {option.label}
        </span>
    );

    return <div className="border rounded-md flex items-center">
        <span className='ml-3 text-sm text-gray-500'>{label}</span>
        <Select
            value={value}
            // @ts-ignore
            onChange={onChange}
            className='w-full flex-1'
            isMulti
            onInputChange={setInput}
            defaultValue={defaultValues}
            placeholder={''}
            formatOptionLabel={formatOptionLabel}
            options={input ? options.concat({ label: input, value: input }) : options}
            classNames={{
                control: () => {
                    return '!border-none !outline-none !ring-0 !shadow-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none dark:bg-transparent'
                },
                multiValue: () => {
                    return 'dark:!bg-gray-700'
                },
                multiValueLabel: () => {
                    return 'dark:text-white dark:bg-gray-700 rounded-md'
                }
            }}
            classNamePrefix="select"
        />
    </div>
};

export default TagInput;
