import trees from "./trees.svg";
import bird from "./bird.svg";
import polygonal from "./polygonal.svg"
const option1 = trees
const option2 = bird
const option3 = polygonal

export const getRandomOptionPhoto = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;

    if (randomNumber === 1) {
        return option1;
    }
    if (randomNumber === 2) {
        return option2;
    }
    else {
        return option3;
    }
}

