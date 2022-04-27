import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

import { IHeaderProps } from "./Header.models";
import "./Header.css";

const Header = ({ handleSearch, isLoading }: IHeaderProps) => {
    const [searchValue, setSearchValue] = useState("");
    const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    };
    const handleSubmit = () => {
        handleSearch(searchValue);
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (searchValue.length === 0) {
            return;
        }
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <header>
            <h3>Movie finder</h3>
            <Grid container spacing={2}>
                <Grid item flex={1}>
                    <TextField
                        onChange={handleChangeSearch}
                        value={searchValue}
                        variant="filled"
                        label="Enter a movie title"
                        fullWidth
                        autoFocus
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                </Grid>
                <Grid item alignItems="center" display="flex">
                    <Button
                        onClick={handleSubmit}
                        disabled={searchValue.length === 0 || isLoading}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </header>
    );
};

export default Header;
