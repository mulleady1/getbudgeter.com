#!/usr/bin/env python

import argparse
import csv
import datetime
import glob
import json
import locale
import re

from os.path import basename

locale.setlocale(locale.LC_ALL, '')


def crunch(filenames):
    data = []
    for filename in filenames:
        with open(filename, 'rb') as csvfile:
            reader, negate_value = _get_reader(csvfile)
            for row in reader:
                if not _should_skip(row, negate_value):
                    amt = float(row['amount'])
                    data.append({
                        'date': row['date'],
                        'amt': amt if not negate_value else -amt,
                        'desc': re.sub(r'\s+', ' ', row['description'].strip())
                    })
    return sorted(data, key=lambda k: k['date'])


def _get_filenames(date=None):
    if date is None:
        now = datetime.datetime.now()
        year = now.year
        month = now.month
    else:
        year = int(str(date)[:4])
        month = int(str(date)[4:])

    month_year = '%04d_%02d' % (year, month)
    return glob.glob('data/*%s.csv' % month_year)


def _get_reader(f):
    map = {
        'boh': (('date', 'check_num', 'type', 'amount', 'deposit_amount', 'description'), True),
        'wf': (('date', 'amount', 'type', 'check_num', 'description'), False),
        'co': (('date', 'posted_date', 'card_num', 'description', 'category', 'amount', 'credit'), False),
        'citi': (('status', 'date', 'description', 'amount', 'credit', 'card_name'), False)
    }

    key = basename(f.name).split('_')[0]
    fieldnames, negate_value = map[key]
    reader = csv.DictReader(f, fieldnames)
    return (reader, negate_value)


def _should_skip(row, negate_value, config={'flags': []}):
    try:
        amt = float(row['amount'])
        if row['amount'] == '':
            return True
        if negate_value and amt >= 0:
            return True
        if row['description'] == 'CHECK':
            return True
        for flag in config['flags']:
            if flag in row['description']:
                return True
    except:
        return True
    return False


def _print_results(results, min=0):
    total = 0
    gtotal = 0
    out = ['']
    for result in results:
        gtotal += result['amt']
        if result['amt'] >= min:
            total += result['amt']
            out.append('\t%s\t\t%s\t\t%s' % (locale.currency(
                result['amt']), result['date'], result['desc']))
    out.append('')

    if min > 0:
        print('\n'.join(out))
        print(len(out) - 2, 'purchases over %s, sum %s' %
              (locale.currency(min), locale.currency(total)))
    print(len(results), 'purchases total, sum', locale.currency(gtotal))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--date', type=int,
                        help='specify YYYYMM to process')
    parser.add_argument('-m', '--min', type=int,
                        help='specify min amount to show details')
    args = parser.parse_args()
    results = crunch(_get_filenames(args.date))
    _print_results(results, args.min)
