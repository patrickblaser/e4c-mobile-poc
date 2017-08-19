 export class Questionaire {
     constructor(
        public $key:string,
        public name: string,
        public description: string) {
    }

    static fromJsonList(array): Questionaire[] {
        return array.map(Questionaire.fromJson);
    }

    static fromJson({$key, name, description}):Questionaire {
        return new Questionaire(
            $key,
            name,
            description);
    }

 }