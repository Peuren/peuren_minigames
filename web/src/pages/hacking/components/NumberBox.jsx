import { Button } from "@/components/ui/button";
import playAudio from "@/src/utils/playAudio";

function NumberBox({visible, number, onClick}) {
    if (!visible) {
        const handleClick = () => {
            playAudio("tick");
            onClick(number);
        }
        return <Button className="h-28 w-28" onClick={handleClick} />
    }

    return <Button className="h-28 w-28 text-xl" variant="outline">
        {number}
    </Button>
}

export default NumberBox;