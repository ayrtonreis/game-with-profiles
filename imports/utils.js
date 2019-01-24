export const genders = {
    male: 'M',
    female: 'F'
};

export const colors = {
    red: 'R',
    blue: 'B',
    green: 'G',
    yellow: 'Y'
};

export const emptyCardObj = {
    color: null,
    gender: null,
    number: 0
};

const NUMBER_OF_CARDS = 40;
const MAX_CARD_NUMBER = 10;

export function shuffleArray(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

/*export function generateCardsArray(color=colors.red){
    let gender;
    if(color === colors.red || color === colors.blue)
        gender = genders.male;
    else if(color === colors.green || color === colors.yellow)
        gender = genders.female;
    else
        return [];

    return Array(NUMBER_OF_CARDS).fill().map((v,index) => ({
        color,
        gender,
        number: index % 10 + 1,
    }));
}*/

export function generateCardsArray(){

    const genderColorPairs = [
        {color: colors.red, gender: genders.male},
        {color: colors.blue, gender: genders.male},
        {color: colors.green, gender: genders.female},
        {color: colors.yellow, gender: genders.female},
    ];

    const cardsArray = genderColorPairs.map( (obj) => {
        return Array(MAX_CARD_NUMBER).fill().map((v,index) => ({
            color: obj.color,
            gender: obj.gender,
            number: index + 1,
        }));
    });

    //console.log(cardsArray.flat())
    return cardsArray.flat();

    // return Array(NUMBER_OF_CARDS).fill().map((v,index) => ({
    //     color: genderColorPairs[],
    //     gender:,
    //     number: index % 10 + 1,
    // }));
}