
## Installation Instructions:

1. Copy script.js from this repo and paste into new Google sheet script editor (from the Tools menu, choose script editor)
2. Find “API_KEY” in the code and replace with your Sistrix.com API key
3. Hit save, name your new script
4. Go back to the spreadsheet, refresh the page
5. In the top menu of the Spreadsheet, you’ll see “Sistrix Functions”, click on it, choose “check api balance”
6. Authorize with your Google account
7. All done! Go to the spreadsheet and start typing in any of the formulas listed here. 


## Functions

<dl>
<dt><a href="#VISIBILITY_INDEX_SISTRIX">VISIBILITY_INDEX_SISTRIX(type, url, country, mobile, date, history, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns Sistrix visibility index</p>
</dd>
<dt><a href="#INDEXED_PAGES_SISTRIX">INDEXED_PAGES_SISTRIX(type, url, history, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns Sistrix number of indexed pages for a domain</p>
</dd>
<dt><a href="#DOMAIN_KEYWORD_COUNT_SISTRIX">DOMAIN_KEYWORD_COUNT_SISTRIX(type, url, country, mobile, date, history, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns Sistrix the number of Google organic search index keywords found on the domain</p>
</dd>
<dt><a href="#DOMAIN_KEYWORD_COUNT_TOP_10_SISTRIX">DOMAIN_KEYWORD_COUNT_TOP_10_SISTRIX(type, url, country, mobile, date, history, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns Sistrix the number of Top 10 Google organic search index keywords found on the domain</p>
</dd>
<dt><a href="#DOMAIN_OPPORTUNITIES_SISTRIX">DOMAIN_OPPORTUNITIES_SISTRIX(type, url, country, mobile, limit, offset, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns Keyword opportunities</p>
</dd>
<dt><a href="#DOMAIN_IDEAS_SISTRIX">DOMAIN_IDEAS_SISTRIX(type, url, country, mobile, limit, offset, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns Keyword ideas</p>
</dd>
<dt><a href="#DOMAIN_AGE_SISTRIX">DOMAIN_AGE_SISTRIX(type, url, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns Domain age</p>
</dd>
<dt><a href="#DOMAIN_COMPETITORS_SEO_SISTRIX">DOMAIN_COMPETITORS_SEO_SISTRIX(type, url, country, num, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns SEO Competitors</p>
</dd>
<dt><a href="#DOMAIN_COMPETITORS_SEM_SISTRIX">DOMAIN_COMPETITORS_SEM_SISTRIX(type, url, country, num, excludeHeaders)</a> ⇒</dt>
<dd><p>Returns SEM Competitors</p>
</dd>
</dl>

<a name="VISIBILITY_INDEX_SISTRIX"></a>

## VISIBILITY_INDEX_SISTRIX(type, url, country, mobile, date, history, excludeHeaders) ⇒
Returns Sistrix visibility index

**Kind**: global function  
**Returns**: Returns organic keywords count, organic traffic, organic cost, adwords data  
**Link**: https://www.sistrix.com/api/domain/#domainsichtbarkeitsindex domainsichtbarkeitsindex  
**Customfunction**:   

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| country | <code>&quot;us&quot;</code> | OPTIONAL The country database you want to search from |
| mobile | <code>true</code> | OPTIONAL true for Mobile index |
| date | <code>2016-09-15</code> | OPTIONAL YYYY-MM-DD format |
| history | <code>true</code> | OPTIONAL true for historical |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="INDEXED_PAGES_SISTRIX"></a>

## INDEXED_PAGES_SISTRIX(type, url, history, excludeHeaders) ⇒
Returns Sistrix number of indexed pages for a domain

**Kind**: global function  
**Returns**: Returns date YYMMDD, index page count  
**Customfunction**: <code>@link https://www.sistrix.com/api/domain/#domainpages domainpages</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| history | <code>true</code> | OPTIONAL true for historical |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="DOMAIN_KEYWORD_COUNT_SISTRIX"></a>

## DOMAIN_KEYWORD_COUNT_SISTRIX(type, url, country, mobile, date, history, excludeHeaders) ⇒
Returns Sistrix the number of Google organic search index keywords found on the domain

**Kind**: global function  
**Returns**: Returns date, keyword count  
**Customfunction**:   

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| country | <code>&quot;us&quot;</code> | OPTIONAL The country database you want to search from |
| mobile | <code>true</code> | OPTIONAL true for Mobile index |
| date | <code>2016-09-15</code> | OPTIONAL YYYY-MM-DD format |
| history | <code>true</code> | OPTIONAL true for historical |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="DOMAIN_KEYWORD_COUNT_TOP_10_SISTRIX"></a>

## DOMAIN_KEYWORD_COUNT_TOP_10_SISTRIX(type, url, country, mobile, date, history, excludeHeaders) ⇒
Returns Sistrix the number of Top 10 Google organic search index keywords found on the domain

**Kind**: global function  
**Returns**: Returns date, keyword count  
**Customfunction**:   

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| country | <code>&quot;us&quot;</code> | OPTIONAL The country database you want to search from |
| mobile | <code>true</code> | OPTIONAL true for Mobile index |
| date | <code>2016-09-15</code> | OPTIONAL YYYY-MM-DD format |
| history | <code>true</code> | OPTIONAL true for historical |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="DOMAIN_OPPORTUNITIES_SISTRIX"></a>

## DOMAIN_OPPORTUNITIES_SISTRIX(type, url, country, mobile, limit, offset, excludeHeaders) ⇒
Returns Keyword opportunities

**Kind**: global function  
**Returns**: Returns Gain, Keywords, Positions, Urls ,Competition level  
**Customfunction**: <code>@link https://www.sistrix.com/api/domain/#domainopportunities domainopportunities</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| country | <code>&quot;us&quot;</code> | OPTIONAL The country database you want to search from |
| mobile | <code>true</code> | OPTIONAL true for Mobile index |
| limit | <code>10</code> | OPTIONAL number of results to return. Default is 10 |
| offset | <code>true</code> | OPTIONAL works with limit, get results from a specific line number |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="DOMAIN_IDEAS_SISTRIX"></a>

## DOMAIN_IDEAS_SISTRIX(type, url, country, mobile, limit, offset, excludeHeaders) ⇒
Returns Keyword ideas

**Kind**: global function  
**Returns**: Returns Keywords, Competition level  
**Customfunction**: <code>@link https://www.sistrix.com/api/domain/#domainideas domainideas</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| country | <code>&quot;us&quot;</code> | OPTIONAL The country database you want to search from |
| mobile | <code>true</code> | OPTIONAL true for Mobile index |
| limit | <code>10</code> | OPTIONAL number of results to return. Default is 10 |
| offset | <code>true</code> | OPTIONAL works with limit, get results from a specific line number |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="DOMAIN_AGE_SISTRIX"></a>

## DOMAIN_AGE_SISTRIX(type, url, excludeHeaders) ⇒
Returns Domain age

**Kind**: global function  
**Returns**: Returns Age YYYYMMDD  
**Customfunction**: <code>@link https://www.sistrix.com/api/domain/#domainage domainage</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="DOMAIN_COMPETITORS_SEO_SISTRIX"></a>

## DOMAIN_COMPETITORS_SEO_SISTRIX(type, url, country, num, excludeHeaders) ⇒
Returns SEO Competitors

**Kind**: global function  
**Returns**: Returns Competing domain, match  
**Customfunction**: <code>@link https://www.sistrix.com/api/domain/#domaincompetitorsseo domaincompetitorsseo</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| country | <code>&quot;us&quot;</code> | OPTIONAL The country database you want to search from |
| num | <code>10</code> | OPTIONAL number of results to return. Default is 10 |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

<a name="DOMAIN_COMPETITORS_SEM_SISTRIX"></a>

## DOMAIN_COMPETITORS_SEM_SISTRIX(type, url, country, num, excludeHeaders) ⇒
Returns SEM Competitors

**Kind**: global function  
**Returns**: Returns Competing domain, match  
**Customfunction**: <code>@link https://www.sistrix.com/api/domain/#domaincompetitorssem domaincompetitorssem</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>&quot;domain&quot;</code> | REQUIRED The type of URL you want results for. Accepted values are: domain, host, path, url |
| url | <code>&quot;example.com&quot;</code> | REQUIRED The url |
| country | <code>&quot;us&quot;</code> | OPTIONAL The country database you want to search from |
| num | <code>10</code> | OPTIONAL number of results to return. Default is 10 |
| excludeHeaders | <code>true</code> | OPTIONAL true to exclude the column headers. Default is false |

