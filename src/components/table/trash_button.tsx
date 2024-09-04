import React from "react";
import trash_img from '../../assets/trash.svg';

type iProps = {
    id: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const TrashButton: React.FC<iProps> = ({id, onClick}) => {
    //const [state, setState] = useState(0);

    return (
        <button type="button"
                className="trash-button text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                onClick={onClick}
        >
            <img src={trash_img} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" />
        </button>
    );
}
