Rails.application.routes.draw do
  root 'home#index'
end
Rails.application.routes.draw do
  root 'home#index'
  namespace :api, defaults: { format: :json } do
    resources :backgrounds, except: [:new, :edit]
  end
end
