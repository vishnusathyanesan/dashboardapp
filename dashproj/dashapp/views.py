from django.shortcuts import render
import urllib2
import simplejson
import feedparser
from django.shortcuts import render_to_response, HttpResponse, render
import json
from time import mktime
from datetime import datetime


# Create your views here.
def check(request):
	#http://www.google.com/alerts/feeds/13172112245289928208/10573968695315493577
	#http://www.rediff.com/rss/inrss.xml
	url = request.GET['url']
	d = feedparser.parse(url)
	data = {}
	data['title'] = d['feed']['title']
	data['link'] = d['feed']['link']
	# data['subtitle'] =d.feed.subtitle
	temp = []
	# print d
	for i in d['entries']:
		if 'updated_parsed' in i:
			i['updated_parsed'] = datetime.fromtimestamp(mktime(i['updated_parsed'])).strftime('%Y-%m-%dT%H:%M:%S')
			i['published_parsed'] = datetime.fromtimestamp(mktime(i['published_parsed'])).strftime('%Y-%m-%dT%H:%M:%S')
		temp.append(i)
	# print temp

	data['entries'] = temp
	return HttpResponse(content=json.dumps(data), content_type='Application/json')
	# url = ('https://ajax.googleapis.com/ajax/services/feed/find?' +'v=1.0&q=Official%20Google%20Blog&userip=INSERT-USER-IP')
	# request = urllib2.Request(url, None, {'Referer': "localhost:8001"})
	# response = urllib2.urlopen(request)

	# # Process the JSON string.
	# results = simplejson.load(response)
	# print results
	# # now have some fun with the results...