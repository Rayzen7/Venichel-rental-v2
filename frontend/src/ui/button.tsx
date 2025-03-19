interface ButtonCustomProps {
    color?: string;
    padding: number;
    icon?: React.ReactNode;
    onClick: () => void;
}

export default function MagicButton({ color = 'green', icon, onClick, padding = 20 }: ButtonCustomProps) {    
    return (
        <button onClick={onClick} className={`
            ${
                color == 'green' ? 'bg-green-500 hover:bg-green-600' :
                color == 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                'bg-red-500 hover:bg-red-600'
            }
            duration-200 cursor-pointer rounded-md`} style={{padding: `${padding}px`}}>
            <span className="w-6 h-6 fill-white">
                {icon}
            </span>
        </button>
    )
}