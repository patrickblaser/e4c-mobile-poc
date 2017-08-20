 export class Question {
     constructor(
        public $key:string,
        public value: string) {
    }

    static fromJsonList(array): Question[] {
        return array.map(Question.fromJson);
    }

    static fromJson({$key, value}):Question {
        return new Question(
            $key,
            value);
    }

 }