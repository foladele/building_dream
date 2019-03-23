
Rails.application.routes.draw do

  root 'home#index'
  namespace :api, defaults: { format: :json } do
    resources :backgrounds, except: [:new, :edit]
    resources :sections do
      resources :items
    end
  end
end
