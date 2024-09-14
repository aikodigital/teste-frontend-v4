import { Box, Input, List, ListItem, InputGroup, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';

export const Combobox = ({ placeholder, options, value, onChange }: { placeholder: string; options: string[]; value: string; onChange: (value: string) => void }) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [showOptions, setShowOptions] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

    // Atualiza as opções filtradas quando as opções ou o valor do input mudam
    useEffect(() => {
        setFilteredOptions(options.filter(option => option.toLowerCase().includes(inputValue.toLowerCase())));
    }, [inputValue, options]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange(newValue);
    };

    const handleOptionSelect = (option: string) => {
        setInputValue(option);
        onChange(option);
        setShowOptions(false);
    };

    const handleClear = () => {
        setInputValue("");
        onChange("");
        setShowOptions(false);
    };

    return (
        <Box position="relative" w="100%" zIndex={1000}>
            <InputGroup>
                <Input
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={() => setShowOptions(true)}
                    onFocus={() => setShowOptions(true)}
                    onBlur={() => setTimeout(() => setShowOptions(false), 100)}
                />
                {/* Exibe botão de limpar sempre que expandir */}
                {inputValue && (
                    <IconButton
                        aria-label="Clear"
                        icon={<CloseIcon />}
                        onClick={handleClear}
                        position="absolute"
                        right="50px"
                        top="50%"
                        transform="translateY(-50%)"
                        size="sm"
                    />
                )}
                <IconButton
                    aria-label="Expand"
                    icon={<ChevronDownIcon />}
                    onClick={() => setShowOptions(prev => !prev)}
                    position="absolute"
                    right="10px"
                    top="50%"
                    transform="translateY(-50%)"
                    size="sm"
                />
            </InputGroup>
            {showOptions && filteredOptions.length > 0 && (
                <List
                    position="absolute"
                    top="100%"
                    left="0"
                    width="100%"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    bg="white"
                    zIndex={10}
                    maxHeight="200px"
                    overflowY="auto"
                    boxShadow="md"
                >
                    {filteredOptions.map((option) => (
                        <ListItem
                            key={option}
                            p={2}
                            _hover={{ bg: "gray.300", cursor: "pointer" }}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};
