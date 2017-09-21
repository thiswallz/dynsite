/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://pc95hghh0g.execute-api.us-east-1.amazonaws.com/qa';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.rootGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var rootGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(rootGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.rootPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var rootPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(rootPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.rootOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var rootOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(rootOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['status'], ['body']);
        
        var channelGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/channel').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['status']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/channel').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/channel').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/channel').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/channel').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelEmbedGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['player', 'uuid'], ['body']);
        
        var channelEmbedGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/embed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['player', 'uuid']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelEmbedGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelEmbedOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelEmbedOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/embed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelEmbedOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelEmbedIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelEmbedIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/embed/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelEmbedIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelEmbedjsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelEmbedjsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/embedjs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelEmbedjsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelEmbedjsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelEmbedjsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/embedjs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelEmbedjsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelEmbedjsInparamsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['inparams'], ['body']);
        
        var channelEmbedjsInparamsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/embedjs/{inparams}').expand(apiGateway.core.utils.parseParametersToObject(params, ['inparams'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelEmbedjsInparamsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelEmbedjsInparamsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelEmbedjsInparamsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/embedjs/{inparams}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelEmbedjsInparamsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var channelIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.channelIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var channelIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/channel/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(channelIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.dominiosPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var dominiosPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/dominios').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(dominiosPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.dominiosDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var dominiosDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/dominios').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(dominiosDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.dominiosOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var dominiosOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dominios').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(dominiosOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.dominiosNameGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['name'], ['body']);
        
        var dominiosNameGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/dominios/{name}').expand(apiGateway.core.utils.parseParametersToObject(params, ['name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(dominiosNameGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.dominiosNameDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['name'], ['body']);
        
        var dominiosNameDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/dominios/{name}').expand(apiGateway.core.utils.parseParametersToObject(params, ['name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(dominiosNameDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.dominiosNameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var dominiosNameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/dominios/{name}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(dominiosNameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['type'], ['body']);
        
        var eventGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['type']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var eventPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var eventOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var eventIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/event/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var eventIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/event/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var eventIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/event/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var folderGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/folder').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var folderPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/folder').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var folderOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/folder').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var folderIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/folder/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var folderIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/folder/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var folderIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/folder/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderIdVideoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var folderIdVideoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/folder/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderIdVideoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderIdVideoPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var folderIdVideoPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/folder/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderIdVideoPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderIdVideoDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var folderIdVideoDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/folder/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderIdVideoDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.folderIdVideoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var folderIdVideoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/folder/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(folderIdVideoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.liveconfGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var liveconfGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/liveconf').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(liveconfGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.liveconfOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var liveconfOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/liveconf').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(liveconfOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.loginPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var loginPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/login').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(loginPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.loginOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var loginOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/login').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(loginOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var mediaGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/media').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var mediaPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/media').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var mediaOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/media').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var mediaIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/media/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaIdPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var mediaIdPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/media/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaIdPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var mediaIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/media/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaIdCarpetasGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var mediaIdCarpetasGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/media/{id}/carpetas').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaIdCarpetasGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.mediaIdCarpetasDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var mediaIdCarpetasDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/media/{id}/carpetas').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(mediaIdCarpetasDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var paymentsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/payments').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsLoginPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var paymentsLoginPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/payments/login').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsLoginPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsLoginOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var paymentsLoginOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/payments/login').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsLoginOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsPaypalPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var paymentsPaypalPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/payments/paypal').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsPaypalPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsPaypalOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var paymentsPaypalOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/payments/paypal').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsPaypalOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsValidateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['pwd', 'email'], ['body']);
        
        var paymentsValidateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/payments/validate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['pwd', 'email']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsValidateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsValidatePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var paymentsValidatePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/payments/validate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsValidatePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.paymentsValidateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var paymentsValidateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/payments/validate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(paymentsValidateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playerIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playerIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/player/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playerIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playerIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playerIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/player/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playerIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['status'], ['body']);
        
        var playersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/players').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['status']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playersPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/players').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playersPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/players').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playersDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/players').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/players').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playersIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/players/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playersIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/players/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playersIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playersIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/players/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playersIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playlistGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playlistPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playlistOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playlistIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playlistIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playlistIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistIdVideoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playlistIdVideoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistIdVideoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistIdVideoPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playlistIdVideoPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistIdVideoPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistIdVideoDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var playlistIdVideoDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistIdVideoDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.playlistIdVideoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var playlistIdVideoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/playlist/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(playlistIdVideoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioConfigConfigsiteGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['configsite', 'cache'], ['body']);
        
        var sitioConfigConfigsiteGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/config/{configsite}').expand(apiGateway.core.utils.parseParametersToObject(params, ['configsite', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioConfigConfigsiteGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioConfigConfigsiteOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['cache'], ['body']);
        
        var sitioConfigConfigsiteOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/config/{configsite}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioConfigConfigsiteOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'cache'], ['body']);
        
        var sitioIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdCollectionsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdCollectionsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/collections').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdCollectionsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdCollectionsIdCollectionGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id_collection', 'id', 'json', 'keywords', 'videoId', 'cache', 'tags', 'items', 'page'], ['body']);
        
        var sitioIdCollectionsIdCollectionGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/collections/{id_collection}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id_collection', 'id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['json', 'keywords', 'videoId', 'cache', 'tags', 'items', 'page']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdCollectionsIdCollectionGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdCollectionsIdCollectionOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdCollectionsIdCollectionOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/collections/{id_collection}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdCollectionsIdCollectionOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdGalleryGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'cache'], ['body']);
        
        var sitioIdGalleryGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/gallery').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdGalleryGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdGalleryPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdGalleryPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/gallery').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdGalleryPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdGalleryOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdGalleryOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/gallery').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdGalleryOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLikePut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdLikePutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/like').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLikePutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLikeOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdLikeOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/like').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLikeOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLoginGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'pwd', 'uname'], ['body']);
        
        var sitioIdLoginGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/login').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['pwd', 'uname']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLoginGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLoginOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdLoginOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/login').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLoginOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLogincustomGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'pwd', 'email', 'idsite'], ['body']);
        
        var sitioIdLogincustomGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/logincustom').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['pwd', 'email', 'idsite']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLogincustomGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLogincustomPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdLogincustomPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/logincustom').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLogincustomPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLogincustomDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdLogincustomDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/logincustom').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLogincustomDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLogincustomOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdLogincustomOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/logincustom').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLogincustomOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLogincustomvalidateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'idsite', 'email'], ['body']);
        
        var sitioIdLogincustomvalidateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/logincustomvalidate').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['idsite', 'email']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLogincustomvalidateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdLogincustomvalidateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdLogincustomvalidateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/logincustomvalidate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdLogincustomvalidateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdPlayersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'cache'], ['body']);
        
        var sitioIdPlayersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/players').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdPlayersGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdPlayersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdPlayersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/players').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdPlayersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdPlaylistIdusuarioGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idusuario', 'id', 'cache'], ['body']);
        
        var sitioIdPlaylistIdusuarioGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/playlist/{idusuario}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idusuario', 'id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdPlaylistIdusuarioGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdPlaylistIdusuarioOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdPlaylistIdusuarioOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/playlist/{idusuario}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdPlaylistIdusuarioOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdPropertiesNameGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['name', 'id', 'cache'], ['body']);
        
        var sitioIdPropertiesNameGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/properties/{name}').expand(apiGateway.core.utils.parseParametersToObject(params, ['name', 'id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdPropertiesNameGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdPropertiesNameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdPropertiesNameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/properties/{name}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdPropertiesNameOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdSourcesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'cache'], ['body']);
        
        var sitioIdSourcesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/sources').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdSourcesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdSourcesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdSourcesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/sources').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdSourcesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdStylesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'cache'], ['body']);
        
        var sitioIdStylesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/styles').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdStylesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdStylesPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdStylesPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/styles').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdStylesPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdStylesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdStylesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/styles').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdStylesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdVideoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var sitioIdVideoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdVideoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdVideoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdVideoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/video').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdVideoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdVideoIdvideoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['idvideo', 'id', 'cache'], ['body']);
        
        var sitioIdVideoIdvideoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/video/{idvideo}').expand(apiGateway.core.utils.parseParametersToObject(params, ['idvideo', 'id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['cache']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdVideoIdvideoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.sitioIdVideoIdvideoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var sitioIdVideoIdvideoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sitio/{id}/video/{idvideo}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(sitioIdVideoIdvideoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/social').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/social').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/social').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/social').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialPatch = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialPatchRequest = {
            verb: 'patch'.toUpperCase(),
            path: pathComponent + uritemplate('/social').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialPatchRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/social').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialFacebookTokenGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialFacebookTokenGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/social/facebook/token').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialFacebookTokenGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialFacebookTokenOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialFacebookTokenOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/social/facebook/token').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialFacebookTokenOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialTargetGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialTargetGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/social/target').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialTargetGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialTargetPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialTargetPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/social/target').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialTargetPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialTargetPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialTargetPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/social/target').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialTargetPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialTargetDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialTargetDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/social/target').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialTargetDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialTargetPatch = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialTargetPatchRequest = {
            verb: 'patch'.toUpperCase(),
            path: pathComponent + uritemplate('/social/target').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialTargetPatchRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.socialTargetOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var socialTargetOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/social/target').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(socialTargetOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsEventoIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'fuente', 'tab', 'filtro', 'dateRange'], ['body']);
        
        var statisticsEventoIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/evento/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['fuente', 'tab', 'filtro', 'dateRange']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsEventoIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsEventoIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsEventoIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/evento/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsEventoIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsGalleryOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsGalleryOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/gallery').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsGalleryOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsGalleryIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id', 'fuente', 'tab', 'idr', 'filtro', 'dateRange'], ['body']);
        
        var statisticsGalleryIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/gallery/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['fuente', 'tab', 'idr', 'filtro', 'dateRange']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsGalleryIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsGalleryIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsGalleryIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/gallery/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsGalleryIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsOnlineGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['uuid'], ['body']);
        
        var statisticsOnlineGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/online').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['uuid']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsOnlineGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsOnlinePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsOnlinePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/online').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsOnlinePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsOnlineOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsOnlineOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/online').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsOnlineOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsTrackerPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsTrackerPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/tracker').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsTrackerPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.statisticsTrackerOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var statisticsTrackerOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/statistics/tracker').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(statisticsTrackerOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templateGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['type', 'status'], ['body']);
        
        var templateGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/template').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['type', 'status']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templateGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.templateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var templateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/template').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(templateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPlanGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userPlanGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/user/plan').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPlanGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userPlanOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userPlanOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/plan').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userPlanOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userProfilePasswordPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userProfilePasswordPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/user/profile/password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userProfilePasswordPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userProfilePasswordOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userProfilePasswordOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/profile/password').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userProfilePasswordOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userValidateOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userValidateOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/validate').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userValidateOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userValidateEmailGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['email'], ['body']);
        
        var userValidateEmailGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/user/validate/{email}').expand(apiGateway.core.utils.parseParametersToObject(params, ['email'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userValidateEmailGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userValidateEmailOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userValidateEmailOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/validate/{email}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userValidateEmailOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var userIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var userIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['items', 'page'], ['body']);
        
        var videoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/video').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['items', 'page']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoEmbedGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['player', 'uuid'], ['body']);
        
        var videoEmbedGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/video/embed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['player', 'uuid']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoEmbedGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoEmbedOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoEmbedOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/embed').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoEmbedOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoExternalPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoExternalPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/video/external').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoExternalPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoExternalOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoExternalOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/external').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoExternalOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoProfilesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['type'], ['body']);
        
        var videoProfilesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/video/profiles').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['type']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoProfilesGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoProfilesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoProfilesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/profiles').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoProfilesOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoTranscodingPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoTranscodingPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/video/transcoding').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoTranscodingPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoTranscodingOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoTranscodingOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/transcoding').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoTranscodingOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoTranscodingIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoTranscodingIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/video/transcoding/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoTranscodingIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoTranscodingIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoTranscodingIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/transcoding/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoTranscodingIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdDeleteRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdStatusGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoIdStatusGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}/status').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdStatusGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdStatusPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoIdStatusPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}/status').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdStatusPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdStatusOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoIdStatusOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}/status').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdStatusOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdThumbsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoIdThumbsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}/thumbs').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdThumbsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdThumbsPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);
        
        var videoIdThumbsPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}/thumbs').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdThumbsPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.videoIdThumbsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var videoIdThumbsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/video/{id}/thumbs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(videoIdThumbsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
