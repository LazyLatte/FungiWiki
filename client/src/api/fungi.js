

import axios from 'axios';

// Develop server URL
//const fungiBaseUrl = 'http://localhost:3000/api';
const fungiBaseUrl = 'http://Fungi-wiki-dev.us-west-2.elasticbeanstalk.com/api';
// Staging server URL
//const questionBaseUrl = 'http://weathermood-db-13.us-west-2.elasticbeanstalk.com/api';
//const postBaseUrl = '123';
// Production server URL
// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function listFungi(search) {
    let url = `${fungiBaseUrl}/search`;
    //let re = new RegExp(' +');
    //search = search.replace(/ +/g, '');
    //search = search.replace(/#/g, '%23');
    url+=('?'+`s=${search}`);


    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function listFungiByCategory(category) {
    let url = `${fungiBaseUrl}/category`;
    url+=('?'+`c=${category}`);



    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function getFungi(name) {
    let url = `${fungiBaseUrl}/fungi`;
    url+=('?'+`name=${name}`);



    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

/*
export function createQuestions(subject, content, answer, isMultipleChoice, choice) {
    let url = `${questionBaseUrl}/questions`;


    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
      subject,
      content,
      answer,
      isMultipleChoice,
      choice

    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
export function updateQuestions(id, subject, content, answer, isMultipleChoice, choice, isAssign) {
    let url = `${questionBaseUrl}/questions`;


    console.log(`Making PATCH request to: ${url}`);

    return axios.patch(url, {
      id,
      subject,
      content,
      answer,
      isMultipleChoice,
      choice,
      isAssign

    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function deleteQuestions(id) {
    let url = `${questionBaseUrl}/questions`;

    url+=('?'+`id=${id}`)
    console.log(`Making DELETE request to: ${url}`);

    return axios.delete(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
*/
