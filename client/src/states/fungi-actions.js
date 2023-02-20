import {
    listFungi as listFungiFromApi,
    listFungiByCategory as listFungiByCategoryFromApi,
    getFungi as getFungiFromApi
    //listAllQuestions as listAllQuestionsFromApi
} from 'api/fungi.js';
/*
export function setSubject(subject) {
    return {
        type: '@SUBJECT/SET_SUBJECT',
        subject: subject
    };
}
export function questionFormToggle(modal) {
    return {
        type: '@MODAL/SET_MODAL',
        modal: modal
    };
}
*/
export const setMasking = (masking) => dispatch => {
  dispatch({
    type: '@MASKING/SET_MASKING',
    masking: masking
  });
  return Promise.resolve();
};


export function showFungiDetail(fungi) {
    return {
        type: '@SUBJECT/SET_SUBJECT',
        fungi
    };
}

function startLoading() {
    return {
        type: '@QUESTION/START_LOADING'
    };
}
function endLoading() {
    return {
        type: '@QUESTION/END_LOADING'
    };
}
function endListFungi(fungi) {
    return {
        type: '@QUESTION/END_LIST_POSTS',
        fungi
    };
}

export function listFungi(search) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listFungiFromApi(search).then(fungi => {
            dispatch(endListFungi(fungi));
        }).catch(err => {
            console.error('Error listing fungi', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};

export function listFungiByCategory(category) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listFungiByCategoryFromApi(category).then(fungi => {
            dispatch(endListFungi(fungi));
        }).catch(err => {
            console.error('Error listing fungi', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};
export function getFungi(name) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return getFungiFromApi(name).then(fungi => {
            dispatch(showFungiDetail(fungi));
        }).catch(err => {
            console.error('Error listing fungi', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};
/*
export function answersConfirmed(answers) {
  return {
      type: '@ANSWERS/ANSWERS_CONFIRMED',
      answers
  };
};
function endListAllQuestions(subject, questions) {
    return {
        type: '@QUESTION/END_LIST_ALL_QUESTIONS',
        subject,
        questions
    };
}
export function listAllQuestions(subject) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listAllQuestionsFromApi(subject).then(questions => {
            dispatch(endListAllQuestions(subject, questions));
        }).catch(err => {
            console.error('Error listing questions', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};
*/
