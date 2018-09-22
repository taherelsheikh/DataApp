from flask import Flask, render_template, request, json, jsonify
from flask_cors import CORS, cross_origin
from flask_uploads import UploadSet, configure_uploads, DATA
import pandas as pd
import os.path
from time import gmtime, strftime


app = Flask(__name__)
CORS(app)


files = UploadSet('files', DATA)

app.config['UPLOADED_FILES_DEST'] = '/Users/telsheikh/Documents/dataeng_githubpages/uploads'
configure_uploads(app, files)

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        try :
            filename = files.save(request.files['csv'])
            return ('', 200)
        finally:
            return ('', 204)
        # return "worked"


@app.route('/csvs', methods=['POST'])
def my_test_endpoint():
    # json = json.loads(request.data)
    # # data = json_normalize(json)

    # get data from post request
    data = json.loads(request.data)

    # check if file exists
    if os.path.exists('/Users/telsheikh/Documents/dataeng_githubpages/datajobs.csv') :
        oldDf = pd.read_csv("/Users/telsheikh/Documents/dataeng_githubpages/datajobs.csv")

    else :
        oldDf = pd.DataFrame(columns=['time', 'from_database', 'from_schema',
        'from_table', 'from_where', 'to_database', 'to_schema', 'to_table',
        'csv_name', 'csv_size', 'csv_type', 'job','email', 'slack'])

    # from data
    csvName = data['fromData']['csvName']
    csvSize = data['fromData']['csvSize']
    csvType = data['fromData']['csvType']
    fromDatabase = data['fromData']['fromDataBase']
    fromSchema = data['fromData']['fromSchemaName']
    fromTable = data['fromData']['fromTableName']
    fromWhere = data['fromData']['fromWhereClause']
    time = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    # to data
    radioButtons = data['radioData']
    email = data['toData']['email']
    slack = data['toData']['slack']
    toDatabase = data['toData']['toDataBase']
    toSchema = data['toData']['toSchemaName']
    toTable = data['toData']['toTableName']
    # create append dataframe
    df = pd.DataFrame({'time': [time], 'csv_name': [csvName],
    'csv_size': [csvSize], 'csv_type': [csvType],
    'from_database': [fromDatabase], 'from_schema': [fromSchema],
    'from_table': [fromTable], 'from_where': [fromWhere],
    'job': [radioButtons], 'email': [email], 'slack': [slack],
    'to_database': [toDatabase], 'to_schema': [toSchema],
    'to_table': [toTable]
    })
    # order the df's columns
    orderedDf = df[['time', 'from_database', 'from_schema', 'from_table',
    'from_where', 'to_database', 'to_schema', 'to_table', 'csv_name',
    'csv_size', 'csv_type', 'job','email', 'slack']]
    # append with old df
    finalDf = oldDf.append(orderedDf, ignore_index=True)
    # push to directory
    finalDf.to_csv("/Users/telsheikh/Documents/dataeng_githubpages/datajobs.csv",index=False)
    return ('', 200)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
