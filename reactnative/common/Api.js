/**
 * Created by alice on 17/4/10.
 */
export function request(method,url,body) {
    return new Promise((resolve,reject)=>{
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:getBodyString(body)
        })
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                resolve(responseData)
            })
            .catch((error) => {
                console.log(error);
                reject(new Error('Network error!'))
            })
            .done();
    });
}

function post(url,body) {
    return request('POST',url,body);
}

function get(url,body) {
    return request('GET',url,body);
}

export let _apis = {
    getData:_api
};

function _api(method,data,success,fail) {
    let _requestUrl = getApiUrlByMethod(method,data);
    get(_requestUrl,null)
        .then((response) => {
            success(response);
        })
        .catch((error) => {
            fail(error)
        })
        .done();
}

function getApiUrlByMethod(method,data) {
    let urlObj = {
        baseurl: 'http://v3.wufazhuce.com:8000/api',
        homePage: '/hp/bymonth/',
        readingCarousel: '/reading/carousel',
        readingIndex: '/reading/index/',
        essay: '/essay/',
        serialcontent: '/serialcontent/',
        question: '/question/',
        carouselList: '/reading/carousel/',
        movieList: '/movie/list/',
        movieDetail: '/movie/detail/'
    };
    return urlObj.baseurl + urlObj[method] + (data?data:'');
}

function getBodyString(body) {
    var bodyString = '';
    for (key in body) {
        bodyString += key + '=' + body[key] + '&';
    }
    return bodyString.substring(0, bodyString.length - 1);
}