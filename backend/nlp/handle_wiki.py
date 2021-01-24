import wikipedia as wiki
from wikipedia import WikipediaPage as WikiPage
from wikipedia.exceptions import DisambiguationError


def check_disambiguation(wiki_results):
    for result in wiki_results:
        if 'disambiguation' in result:
            return True
    return False


def get_wiki_page(page):
    try:
        res = wiki.page(page)
    except DisambiguationError as e:
        best_related = e.args[0][1]
        res = wiki.page(best_related)

    return res


def check_page_for_keyphrase(bm, kp):
    page_content = get_wiki_page(bm).content
    return True if kp in page_content else False


def check_wiki_page(keyphrase):
    wiki_results = wiki.search(keyphrase)
    best_match = wiki_results[0]

    url = get_wiki_page(keyphrase).url
    disambiguation = False

    if best_match == keyphrase:
        disambiguation = check_disambiguation(wiki_results)

    elif check_page_for_keyphrase(best_match, keyphrase):
        url = wiki.page(best_match).url
        
    return {'url': url, 'dsmb': disambiguation}
