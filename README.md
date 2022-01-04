# Starter project winter 2021

This project is meant to be a starting for homework/projects.
It is Rails 6 API app with React frontend.

### Setup instructions

- clone this repo

```
$ git clone git@github.com:jimibue/starter-w21-router6.git <project_name>
 cd <project_name>
```

- rename database in database.yml
- bundle, create, migrate, seed db
- cd client and run yarn
- remove git remote
- add new git remote

TODO

### Libraries

- devise_token_auth
- React (v)
- react-router (v6)
- Faker
- Rails ( 6.1.4)

### Devise Token Auth Setup

- add devise_token_auth to Gemfile

```ruby
gem "devise_token_auth"
```

```
$ bundle
$ rails g devise_token_auth:install User api/auth
```

- add extend Devise::Models to users

```ruby
class User < ActiveRecord::Base
  extend Devise::Models

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
end
```

\*\*\* We also need to create a migration file to add trackable columns to our users table. This is a problem with the conflicting versions of rails and devise_token_auth.

```
$ rails g migration add_trackable_to_users
```

db/migrations/\_add_trackable_to_users.rb

```ruby
class AddTrackableToUsers < ActiveRecord::Migration[6.0]
  def change
      ## Trackable
      add_column :users, :sign_in_count, :integer, :default => 0
      add_column :users, :current_sign_in_at, :datetime
      add_column :users, :last_sign_in_at, :datetime
      add_column :users, :current_sign_in_ip, :string
      add_column :users, :last_sign_in_ip, :string
  end
end

```

```
$ rails db:migrate
```

### React Router Setup

install react-router-dom

```
$ yarn add react-router-dom
```

setup index.js

```javascript
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

add routes in App.js

```javascript
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/public" element={<Public />} />
      <Route path="/protected" element={<Protected />} />
    </Routes>
  );
}
```

AV_BE CHANGE
