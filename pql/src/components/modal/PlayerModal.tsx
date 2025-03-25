
import { useRef } from "react";
import { usePlayers } from "../../hooks/usePlayers/usePlayers";
import boostrap from "bootstrap/js/dist/modal";

interface propsPlayerModal {
    idPlayer: number;
    namePlayer: string
}

export const PlayerModal = (props: propsPlayerModal) => {
    const { deletePlayer } = usePlayers();
    const modalRef = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        if (modalRef.current) {
          const modal = boostrap.getInstance(modalRef.current);
          modal?.hide();
        }
      };

    return (
        <div className="modal fade" id="exampleModal" ref={modalRef} tabIndex={-1}  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Player</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Would you like to remove <strong>{props.namePlayer}</strong> from the available player list temporarily?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={() => {
                                    deletePlayer(props.idPlayer);
                                    closeModal();
                                }
                            } 
                        >Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}