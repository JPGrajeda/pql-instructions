import React, { useState } from "react"
import TablePlayers from "../components/table/TablePlayers";
import { useForm } from "react-hook-form";
import { schema, FormData } from "../utils/teamSchema";
import { yupResolver } from "@hookform/resolvers/yup";

interface propsHome {

}

const Home = (props: propsHome) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = handleSubmit((data) => console.log("qweqewqwewqweqw",data));

    return (
        <React.Fragment>
            <div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="name">* Name</label>
                    <input {...register("name")}/>
                    <p>{errors.name?.message}</p>

                    <label htmlFor="description">Description</label>
                    <input {...register("description")} />
                    <p>{errors.description?.message}</p>

                    <TablePlayers />

                    <input type="submit" />
                </form>
            </div>

        </React.Fragment>
    )
}

export default Home;