Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :candies, param: :slug
      resources :reviews, onlly: [:create, :destroy]
    end
  end

  get '*path', to: 'pages#index', via: :all # so router doesn't interfere with react-router
end
