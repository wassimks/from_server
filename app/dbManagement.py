from .database import quizz

def filter_questions(year='', unit='', module=''):
    corespQ= quizz.query.filter_by(year=year, unit=unit, module=module).all()
    return corespQ