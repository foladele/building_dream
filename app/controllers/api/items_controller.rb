require 'pry'
class Api::ItemsController < ApplicationController

  before_action :find_section
  
  def index
    # item = Item.all
    # @items = Section.find(params[:section_id])
    # @id = params[:section_id]
    # render json: item

    render json: @section.items
  end

  def show
  end

  def create
    # binding.pry
    # item = Item.new(item_params)
    @item = @section.items.new(item_params)
    if @item.save
      render json: @item
    else
      render json: { errors: @item.errors, status: :unprocessable_entity }
    end
  end

  def update
    @item = Item.find(params[:id])
    # item.update(name: params[:name], color: params[:color])
    if @item.update(item_params)
      render json: @item
    else
       render json: { errors: @item.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    # Item.find(params[:id]).destroy
    
    @section.items.find(params[:id]).destroy
    render json: { message: 'item deleted' }
  end

  private

    def find_section
        @section = Section.find(params[:section_id])
    end

    def item_params
      params.require(:item).permit(:title, :kind, :description, :file)
    end
end
