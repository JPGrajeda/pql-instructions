
import { forwardRef, useImperativeHandle, useRef } from "react";
import boostrap from "bootstrap/js/dist/modal";
import { useTeams } from "../../hooks/useTeams/useTeams";
import { usePlayers } from "../../hooks/usePlayers/usePlayers";
import { useAppContext } from "../../hooks/useAppContext/useAppContext";

interface propsAddPlayerModal {
    nameTeam: string;
    descriptionTeam: string | null;
}

export const PlayerAddModal = forwardRef<{ open: () => void; close: () => void }, propsAddPlayerModal>(({ nameTeam, descriptionTeam }, ref) => {
    const { postTeam } = useTeams();
    const { getPlayers } = usePlayers();
    const { teams, playersSelected } = useAppContext();

    const modalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
        open: () => {
            if (modalRef.current) {
                const modalInstance = new boostrap(modalRef.current);
                modalInstance.show();
            }
        },
        close: () => {
            if (modalRef.current) {
                const modalInstance = boostrap.getInstance(modalRef.current);
                if (modalInstance) modalInstance.hide();
            }
        },
    }));

    return (
        <div className="modal fade" id="addPlayerModal" ref={modalRef} tabIndex={-1} aria-labelledby="addPlayerModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addPlayerModalLabel">Player</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Would you like to create the team <strong>{nameTeam}</strong>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                            onClick={() => ref && typeof ref !== "function" && ref.current?.close()}>
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={async () => {
                                if (playersSelected.length === 0)
                                    return false;

                                await postTeam({
                                    name: nameTeam,
                                    slogan: descriptionTeam || null,
                                    players: playersSelected
                                })

                                await getPlayers();

                                ref && typeof ref !== "function" && ref.current?.close();
                            }
                            }
                        >Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
);