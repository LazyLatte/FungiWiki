
/*
export function subject(state = '', action) {
    switch (action.type) {
        case '@SUBJECT/SET_SUBJECT':
            return action.subject;
        default:
            return state;
    }
}

export function questionForm(state = false, action) {
    switch (action.type) {
        case '@MODAL/SET_MODAL':
            return action.modal;
        default:
            return state;
    }
}
*/
export function masking(state = false, action) {
    switch (action.type) {
        case '@MASKING/SET_MASKING':
            return action.masking;
        default:
            return state;
    }
}
const initFungiDetail ={
  
  id: -1,
  name: '',
  imgsrc: '',
  content: ''
}
export function detail(state = initFungiDetail, action) {
    switch (action.type) {
        case '@SUBJECT/SET_SUBJECT':
            return action.fungi;
        default:
            return state;
    }
}

const initFungiState = {
    fungiLoading: false,
    fungi: [],
    hasMore: true

};
export function fungi(state = initFungiState, action) {
    switch (action.type) {
        case '@QUESTION/START_LOADING':
            return {
                ...state,
                fungiLoading: true
            };
        case '@QUESTION/END_LOADING':
            return {
                ...state,
                fungiLoading: false
            };
        case '@QUESTION/END_LIST_POSTS':
            return {
                ...state,
                fungi : action.fungi,
                hasMore: action.fungi.length > 0
            };

        default:
            return state;
    }
}
/*
export function answer(state = [], action) {
    switch (action.type) {
        case '@ANSWERS/ANSWERS_CONFIRMED':
            return action.answers;
        default:
            return state;
    }
}
const initAllQuestionState = {
    questionLoading: false,
    physicsQuestions: [],
    chemistryQuestions: []


};
export function allQuestion(state = initAllQuestionState, action) {
    switch (action.type) {
        case '@QUESTION/END_LIST_ALL_QUESTIONS':
            if(action.subject==='物理'){
              return {
                  ...state,
                  physicsQuestions: action.questions
              };
            }else if(action.subject==='化學'){
              return {
                  ...state,
                  chemistryQuestions: action.questions
              };
            }else{
              console.error('No such subject', err);
            }



        default:
            return state;
    }
}
*/
