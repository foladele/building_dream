
Rails.application.routes.draw do

  # namespace :api do
  #   get 'item_images/index'
  # end

  # namespace :api do
  #   get 'item_images/create'
  # end

  # namespace :api do
  #   get 'item_images/update'
  # end

  # namespace :api do
  #   get 'item_images/destroy'
  # end

  root 'home#index'
  namespace :api, defaults: { format: :json } do
    resources :backgrounds, except: [:new, :edit]
    resources :sections do
      resources :items 
      resources :item_images
    end
  end
end
