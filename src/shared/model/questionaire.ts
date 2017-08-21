
export class Questionaire {

    static QuestionaireStatus = {
        PENDING: 'pen',
        PUBLISHED: 'pub',
        ARCHIVED: 'arch'
    };


    constructor(
        public $key: string,
        public name: string,
        public description: string,
        public status: string) {
    }

    static fromJsonList(array): Questionaire[] {
        return array.map(Questionaire.fromJson);
    }

    static fromJson({ $key, name, description, status }): Questionaire {
        return new Questionaire(
            $key,
            name,
            description,
            status);
    }

}