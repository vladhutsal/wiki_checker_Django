import RAKE


def get_kp(text):
    stop_dir = 'stop_words.txt'
    rake_object = RAKE.Rake(stop_dir)
    keywords = rake_object.run(text)
    return keywords


