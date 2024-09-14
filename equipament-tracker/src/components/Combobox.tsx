import { Box, Input, List, ListItem, InputGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";

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
                    bg="#1A202C"
                    zIndex={10}
                    maxHeight="200px"
                    overflowY="auto"
                    boxShadow="md"
                >
                    {filteredOptions.map((option) => (
                        <ListItem
                            key={option}
                            p={2}
                            _hover={{ bg: "#2d3544", cursor: "pointer" }}
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
