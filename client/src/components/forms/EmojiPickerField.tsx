import React, { HTMLAttributes, ReactNode } from 'react'
import EmojiPicker, { EmojiStyle, PickerProps } from 'emoji-picker-react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
const EmojiPickerField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    className,
    PopoverProps,
    labelProps,
    label,
    description,
    descriptionProps,
    showErrors = true,
    descreptionPlacement = 'after',
    ...props
}: {
    control: Control<TFieldValues>;
    name: TName;
    className?: string;
    shouldUnregister?: boolean;
    showErrors?: boolean;
    PopoverProps?: {
        popover?: PopoverProps;
        popoverContent?: PopoverContentProps & HTMLAttributes<HTMLDivElement>;
        popoverTrigger?: PopoverTriggerProps & HTMLAttributes<HTMLDivElement>;
    };
    EmojiPickerProps?: Omit<PickerProps, 'mode' | 'selected' | 'onSelect'>;
    label?: string;
    labelProps?: HTMLAttributes<HTMLLabelElement>;
    description?: string | ReactNode;
    descriptionProps?: HTMLAttributes<HTMLParagraphElement>;
    descreptionPlacement?: 'before' | 'after';
}) => {
    const { className: TriggerClassName, ...rest } =
        PopoverProps?.popoverTrigger || {};
    return (
        <FormField
            {...props}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel {...labelProps}>{label}</FormLabel>}
                    <Popover  {...PopoverProps?.popover}>
                        <FormControl>
                            <PopoverTrigger asChild {...rest}>
                                <Button
                                    variant={'outline'}
                                    className={cn(

                                        'text-left justify-start px-1',
                                        TriggerClassName,
                                    )}
                                >

                                    <span className='text-2xl'>
                                        {field.value ? field.value : '🙂'}
                                    </span>
                                    Select Your Favorite Emoji
                                </Button>
                            </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className='min-w-fit px-0 py-0 overflow-hidden'>
                            <EmojiPicker
                                open
                                style={
                                    {
                                        border: 'none',
                                        borderRadius: '0px 0px 10px 10px',

                                    }
                                }

                                searchDisabled
                                emojiStyle={EmojiStyle.NATIVE}
                                className='border-none  border-0 rounded-none'
                                onEmojiClick={(e) => {
                                    field.onChange(e.emoji);
                                }}
                            />
                        </PopoverContent>

                    </Popover>
                    {description && descreptionPlacement === 'after' ? (
                        <FormDescription {...descriptionProps}>
                            {description}
                        </FormDescription>
                    ) : null}
                    {showErrors && <FormMessage />}
                </FormItem>
            )}
        />


    )
}

export default EmojiPickerField