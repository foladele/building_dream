require 'pry'
class Api::ItemsController < ApplicationController
  def index
    item = Item.all
    render json: item
  end

  def show
  end

  def create
    # binding.pry
    item = Item.new(item_params)
    if item.save
      render json: item
    else
      render json: { errors: item.errors, status: :unprocessable_entity }
    end
  end

  def update
    item = Item.find(params[:id])
    # item.update(name: params[:name], color: params[:color])
    if item.update(item_params)
      render json: item
    else
       render json: { errors: item.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    Item.find(params[:id]).destroy
    render json: { message: 'item deleted' }
  end

  private

  def item_params
    params.require(:item).permit(:title, :kind, :description, :file)
  end
end
