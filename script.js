/* ---------------------------------------------------------------------------
* Sistrix API functions (Google sheets) https://www.sistrix.com/api/domain/ 
*
* @desc    Access Organic API calls from the Sistrix.com API using Google sheets custom functions
* @author  Dave Sottimano @dsottimano Twitter
* @license MIT (http://www.opensource.org/licenses/mit-license.php)
* @version 1.0
* --------------------------------------------------------------------------*/

//----------------------------------------------------------------------------


/* ---------------------------------------------------------------------------*
Helper functions START 
* -------------------------------------------------------------------------*/


var checkSistrixAccount = function () {
  if (typeof SistrixGlobal.data.API_KEY !== "string" ||  !SistrixGlobal.data.API_KEY || SistrixGlobal.data.API_KEY == "ENTER YOUR API KEY HERE") {
    return false  
  } 
  try {
    var result = UrlFetchApp.fetch(SistrixGlobal.queries.countUnits + SistrixGlobal.data.API_KEY).getContentText()
    var parsedResult = JSON.parse(result)
    var val = parsedResult.answer[0].credits[0].value
    Browser.msgBox("You have : " + val + " API credits left")
  } catch (e) {
    return e
  }
}


function onOpen() {
  SpreadsheetApp.getUi() 
  .createMenu('Sistrix Functions')
  .addItem('Check API balance', 'checkSistrixAccount')
  .addToUi();
}
/* ---------------------------------------------------------------------------*
Helper functions END 
* -------------------------------------------------------------------------*/


/* ---------------------------------------------------------------------------*
Global Object START 
* ----------------------------------------------------------------------------*/


var SistrixGlobal = {
  data : {
    API_KEY : "ENTER YOUR API KEY HERE",
    API_CREDIT_ERROR_MESSAGE : "Sorry, either you don't have valid API key in the Global object in the script editor or you don't have credits, please check your credentials and balance at https://www.sistrix.com",
    TYPE_ERROR_MESSAGE : 'Sorry, you didn\'t enter a valid type, use "domain", "host", "path" or "url" as values for type',
    DEFAULT_DB : "us"
  },
  queries : {
    countUnits : "https://api.sistrix.com/credits?format=json&api_key=",
    visibilityIndex : "https://api.sistrix.com/domain.sichtbarkeitsindex?format=json&api_key=",
    indexedPages : "https://api.sistrix.com/domain.pages?format=json&api_key=",
    keywordCount : "https://api.sistrix.com/domain.kwcount.seo?format=json&api_key=",
    keywordCountTop10 : "https://api.sistrix.com/domain.kwcount.seo.top10?format=json&api_key=",
    domainOpportunities : "https://api.sistrix.com/domain.opportunities?format=json&api_key=",
    domainIdeas : "https://api.sistrix.com/domain.ideas?format=json&api_key=",
    domainAge : "https://api.sistrix.com/domain.age?format=json&api_key=",
    domainCompetitorsSEO : "https://api.sistrix.com/domain.competitors.seo?format=json&api_key=",
    domainCompetitorsSEM : "https://api.sistrix.com/domain.competitors.sem?format=json&api_key="
  },
  parameters : {
    domain : "&domain=",
    host : "&host=",
    path : "&path=",
    url:  "&url=",
    mobile : "&mobile=",
    date :  "&date=",
    history : "&history=",
    country : "&country=",
    offset : "&offset=",
    limit : "&limit=",
    num : "&num="
  },
  methods : {
    giveApiRest : function () {
      Utilities.sleep(200)
    },
    checkType : function (type) {
      if (type) type = type.toLowerCase()
      if (SistrixGlobal.parameters.hasOwnProperty(type)) {
        type = SistrixGlobal.parameters[type]
        return type
      } 
      return false
    },
    checkSistrixAccount : function () {
      if (typeof SistrixGlobal.data.API_KEY !== "string" ||  !SistrixGlobal.data.API_KEY) {
        return false  
      } 
      try {
        var result = UrlFetchApp.fetch(SistrixGlobal.queries.countUnits + SistrixGlobal.data.API_KEY).getContentText()
        var parsedResult = JSON.parse(result)
        var val = parsedResult.answer[0].credits[0].value
        if (val == 0) return false
        return true
      } catch (e) {
        return e
      }
    },
    dateFormatter : function (arr) {
      return arr.replace(/-/g,"").split("T")
    },
    getVisbilityIndex : function (type,url,country,mobile,date,history) {
      urlConstructor = SistrixGlobal.queries.visibilityIndex + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url 
      if (country) urlConstructor+= SistrixGlobal.parameters.country + country
      if (mobile) urlConstructor+= SistrixGlobal.parameters.mobile + mobile
      if (date) urlConstructor+= SistrixGlobal.parameters.date + date
      if (history) urlConstructor+= SistrixGlobal.parameters.history + history 
      return urlConstructor
    },
    getIndexedPages : function (type,url,history) {
      urlConstructor = SistrixGlobal.queries.indexedPages + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url
      if (history) urlConstructor+= SistrixGlobal.parameters.history + history 
      return urlConstructor
    },
    getDomainKeywordCount : function (top10bool,type,url,country,mobile,date,history) {
      //this function constructs the urls for DOMAIN_KEYWORD_COUNT and DOMAIN_KEYWORD_COUNT_TOP_10 depending on the top10bool
      top10bool ? urlConstructor = SistrixGlobal.queries.keywordCountTop10 + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url : urlConstructor = SistrixGlobal.queries.keywordCount + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url
      if (country) urlConstructor+= SistrixGlobal.parameters.country + country
      if (mobile) urlConstructor+= SistrixGlobal.parameters.mobile + mobile
      if (date) urlConstructor+= SistrixGlobal.parameters.date + date
      if (history) urlConstructor+= SistrixGlobal.parameters.history + history 
      return urlConstructor
    },
    getDomainOpportunities : function(ideasBool,type,url,country, mobile, limit, offset) {
      //this function constructs the urls for DOMAIN_OPPORTUNITIES and DOMAIN_IDEAS depending on the ideasBool
      ideasBool ? urlConstructor = SistrixGlobal.queries.domainIdeas + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url : urlConstructor = SistrixGlobal.queries.domainOpportunities + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url
      if (country) urlConstructor+= SistrixGlobal.parameters.country + country
      if (mobile) urlConstructor+= SistrixGlobal.parameters.mobile + mobile
      if (limit) urlConstructor+= SistrixGlobal.parameters.limit + limit
      if (offset) urlConstructor+= SistrixGlobal.parameters.offset + offset 
      return urlConstructor
    },
    getDomainAge : function(type,url) {  
      urlConstructor = SistrixGlobal.queries.domainAge + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters.domain + url 
      return urlConstructor
    },
    getCompetitors : function(semBool,type,url,country,num) {
      //this function constructs the urls for DOMAIN_COMPETITORS_SEO and DOMAIN_COMPETITORS_SEM depending on the semBool
      semBool ? urlConstructor = SistrixGlobal.queries.domainCompetitorsSEM + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url : urlConstructor = SistrixGlobal.queries.domainCompetitorsSEO + SistrixGlobal.data.API_KEY + SistrixGlobal.parameters[type] + url
      if (country) urlConstructor+= SistrixGlobal.parameters.country + country
      if (num) urlConstructor+= SistrixGlobal.parameters.num + num
      return urlConstructor
    }
  }
}


/* ---------------------------------------------------------------------------*
Global Object END 
* -------------------------------------------------------------------------*/



/* ---------------------------------------------------------------------------*
Main functions START
* -------------------------------------------------------------------------*/

/**
* Returns Sistrix visibility index
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {"us"} country OPTIONAL The country database you want to search from
* @param {true} mobile OPTIONAL true for Mobile index
* @param {2016-09-15} date OPTIONAL YYYY-MM-DD format 
* @param {true} history OPTIONAL true for historical
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns organic keywords count, organic traffic, organic cost, adwords data
* @link https://www.sistrix.com/api/domain/#domainsichtbarkeitsindex domainsichtbarkeitsindex
* @customfunction
*/


function VISIBILITY_INDEX_SISTRIX (type,url,country,mobile,date,history,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE
  var country = country || SistrixGlobal.data.DEFAULT_DB
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getVisbilityIndex(type,url,country,mobile,date,history)).getContentText()
    var parsedResponse = JSON.parse(response), vals = []
    if (parsedResponse.status == "fail") throw parsedResponse.error[0]["error_message"]
      } catch (e) {
        return ["Error: " + e]
      }
  
  if (!excludeHeaders) vals.push(["Index Score","Date"])
  parsedResponse.answer[0].sichtbarkeitsindex.forEach(function(value) {
    var pdate = SistrixGlobal.methods.dateFormatter(value.date)
    vals.push([value.value,pdate[0]])  
  })
  
  return vals
  
}


/**
* Returns Sistrix number of indexed pages for a domain 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {true} history OPTIONAL true for historical
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns date YYMMDD, index page count
* @customfunction
* {@link https://www.sistrix.com/api/domain/#domainpages domainpages}
*/


function INDEXED_PAGES_SISTRIX (type,url,history,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE 
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getIndexedPages(type,url,history)).getContentText()
    var parsedResponse = JSON.parse(response), vals = []
    if (parsedResponse.status == "fail") throw parsedResponse.error[0]["error_message"]
    if (!excludeHeaders) vals.push(["Index Page Count","Date"])
    parsedResponse.answer[0].pages.forEach(function(value) {
      var pdate = SistrixGlobal.methods.dateFormatter(value.date)
      vals.push([value.value,pdate[0]])
    })
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}

/**
* Returns Sistrix the number of Google organic search index keywords found on the domain 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {"us"} country OPTIONAL The country database you want to search from
* @param {true} mobile OPTIONAL true for Mobile index
* @param {2016-09-15} date OPTIONAL YYYY-MM-DD format 
* @param {true} history OPTIONAL true for historical
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns date, keyword count
* @customfunction
*/


function DOMAIN_KEYWORD_COUNT_SISTRIX(type,url,country,mobile,date,history,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE 
  var country = country || SistrixGlobal.data.DEFAULT_DB
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getDomainKeywordCount(false,type,url,country,mobile,date,history)).getContentText()
    var parsedResponse = JSON.parse(response), vals = []
    if (!excludeHeaders) vals.push(["Keyword Count","Date"])
    parsedResponse.answer[0]["kwcount.seo"].forEach(function(value) {
      var pdate = SistrixGlobal.methods.dateFormatter(value.date)
      vals.push([value.value,pdate[0]])
    })
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}


/**
* Returns Sistrix the number of Top 10 Google organic search index keywords found on the domain 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {"us"} country OPTIONAL The country database you want to search from
* @param {true} mobile OPTIONAL true for Mobile index
* @param {2016-09-15} date OPTIONAL YYYY-MM-DD format 
* @param {true} history OPTIONAL true for historical
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns date, keyword count
* @customfunction
*/


function DOMAIN_KEYWORD_COUNT_TOP_10_SISTRIX (type,url,country,mobile,date,history,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE 
  var country = country || SistrixGlobal.data.DEFAULT_DB
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getDomainKeywordCount(true,type,url,country,mobile,date,history)).getContentText()
    var parsedResponse = JSON.parse(response), vals = []
    if (!excludeHeaders) vals.push(["Keyword Count","Date"])
    parsedResponse.answer[0]["kwcount.seo.top10"].forEach(function(value) {
      var pdate = SistrixGlobal.methods.dateFormatter(value.date)
      vals.push([value.value,pdate[0]])
    })
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}


/**
* Returns Keyword opportunities 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {"us"} country OPTIONAL The country database you want to search from
* @param {true} mobile OPTIONAL true for Mobile index
* @param {10} limit OPTIONAL number of results to return. Default is 10 
* @param {true} offset OPTIONAL works with limit, get results from a specific line number
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns Gain, Keywords, Positions, Urls ,Competition level
* @customfunction
* {@link https://www.sistrix.com/api/domain/#domainopportunities domainopportunities}
*/


function DOMAIN_OPPORTUNITIES_SISTRIX(type,url,country,mobile,limit, offset,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE 
  var vals = [], limit = limit || 10, offset = offset || 0, country = country || SistrixGlobal.data.DEFAULT_DB
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getDomainOpportunities(false,type,url,country, mobile, limit, offset)).getContentText()
    var parsedResponse = JSON.parse(response)
    if (!excludeHeaders) vals.push(["Gain", "Keyword","Position", "Url" ,"Competition"])
    parsedResponse.answer[0]["domain.opportunities"].forEach(function(value) { 
      vals.push([value.gain,value.keyword,value.position,value.url,value.competition])
    })
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}

/**
* Returns Keyword ideas 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {"us"} country OPTIONAL The country database you want to search from
* @param {true} mobile OPTIONAL true for Mobile index
* @param {10} limit OPTIONAL number of results to return. Default is 10 
* @param {true} offset OPTIONAL works with limit, get results from a specific line number
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns Keywords, Competition level
* @customfunction
* {@link https://www.sistrix.com/api/domain/#domainideas domainideas}
*/


function DOMAIN_IDEAS_SISTRIX(type,url,country,mobile,limit, offset,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE 
  var vals = [], limit = limit || 10, offset = offset || 0,country = country || SistrixGlobal.data.DEFAULT_DB
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getDomainOpportunities(true,type,url,country, mobile, limit, offset)).getContentText()
    var parsedResponse = JSON.parse(response)
    if (!excludeHeaders) vals.push(["Keyword","Competition"])
    parsedResponse.answer[0]["domain.ideas"].forEach(function(value) { 
      vals.push([value.keyword,value.competition])
    })
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}


/**
* Returns Domain age 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns Age YYYYMMDD
* @customfunction
* {@link https://www.sistrix.com/api/domain/#domainage domainage}
*/

function DOMAIN_AGE_SISTRIX (url,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getDomainAge("domain",url)).getContentText(), vals = []
    var parsedResponse = JSON.parse(response)
    if (!excludeHeaders) vals.push(["Age"])
    var age = SistrixGlobal.methods.dateFormatter(parsedResponse.answer[0].age[0].value) 
    vals.push(age[0])
    
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}


/**
* Returns SEO Competitors 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {"us"} country OPTIONAL The country database you want to search from
* @param {10} num OPTIONAL number of results to return. Default is 10 
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns Competing domain, match
* @customfunction
* {@link https://www.sistrix.com/api/domain/#domaincompetitorsseo domaincompetitorsseo}
*/


function DOMAIN_COMPETITORS_SEO_SISTRIX (type,url,country,num,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE 
  var vals = [], num = num || 10, country = country || SistrixGlobal.data.DEFAULT_DB
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getCompetitors(false,type,url,country,num)).getContentText()
    var parsedResponse = JSON.parse(response)
    if (!excludeHeaders) vals.push(["SEO Competitor","Match"])
    parsedResponse.answer[0].result.forEach(function(value) { 
      vals.push([value.domain,value.match])
    })
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}

/**
* Returns SEM Competitors 
*
* @param {"domain"} type REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url
* @param {"example.com"} url REQUIRED The url
* @param {"us"} country OPTIONAL The country database you want to search from
* @param {10} num OPTIONAL number of results to return. Default is 10 
* @param {true} excludeHeaders OPTIONAL true to exclude the column headers. Default is false
* @return Returns Competing domain, match
* @customfunction
* {@link https://www.sistrix.com/api/domain/#domaincompetitorssem domaincompetitorssem}
*/


function DOMAIN_COMPETITORS_SEM_SISTRIX (type,url,country,num,excludeHeaders) {
  if (!SistrixGlobal.methods.checkSistrixAccount()) return SistrixGlobal.data.API_CREDIT_ERROR_MESSAGE
  if (!SistrixGlobal.methods.checkType(type)) return SistrixGlobal.data.TYPE_ERROR_MESSAGE 
  var vals = [], num = num || 10, country = country || SistrixGlobal.data.DEFAULT_DB
  SistrixGlobal.methods.giveApiRest()
  
  try {
    var response = UrlFetchApp.fetch(SistrixGlobal.methods.getCompetitors(true,type,url,country,num)).getContentText()
    var parsedResponse = JSON.parse(response)
    if (!excludeHeaders) vals.push(["SEM Competitor","Match"])
    parsedResponse.answer[0].result.forEach(function(value) { 
      vals.push([value.domain,value.match])
    })
  } catch (e) {
    return ["error: " + e]
  }
  return vals
  
}


/* ---------------------------------------------------------------------------*
                     Main functions END
* ----------------------------------------------------------------------------*/