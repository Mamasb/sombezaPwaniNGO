from flask import Flask
from routes.api import api_blueprint
from routes.admin.admin_api import admin_blueprint

app = Flask(__name__)
app.register_blueprint(api_blueprint, url_prefix='/api')
app.register_blueprint(admin_blueprint, url_prefix='/admin')

if __name__ == '__main__':
    app.run(debug=True)
