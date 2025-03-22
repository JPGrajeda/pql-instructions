import React from "react";
import { useAppContext } from "../../hooks/useAppContext/useAppContext";

const TeamDropdown = () => {
    const { teams } = useAppContext();
    console.log("🚀 ~ TeamDropdown ~ teams:", teams)

    return (
        <React.Fragment>
            <label className="form-label">Teams</label>
            <select className="form-select">
                {teams.length > 0 ? (
                    <>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </>
                ) : (
                    <option value="" disabled>No teams available</option>
                )}
            </select>
        </React.Fragment>
    );
};

export default TeamDropdown;