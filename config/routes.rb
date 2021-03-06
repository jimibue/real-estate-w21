Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :cats, only: [:index, :update]
    get "properties", to: "properties#index"
    get "cities", to: "properties#get_cities"
    get "cities/:city", to: "properties#city"
    resources :agents, only: [:index, :show]
    resources :buyers, only: [:show]
    # get 'agents', to:"agents#index"
    # get "agents/:id", to: "agents#show"
  end
end
