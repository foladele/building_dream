require 'pry'

class Api::ItemImagesController < ApplicationController

	before_action :find_section
  
  def index
    render json: @section.item_image
  end

  def show
  end

  def create
    # binding.pry
    @item_image  = @section.item_image.new(itemImage_params)
    # binding.pry
    if @item_image.save
      render json: @item_image
    else
      render json: { errors: @item_image.errors, status: :unprocessable_entity }
    end
  end

  def update
    @item_image = ItemImage.find(params[:id])
    if @item_image.update(itemImage_params)
      render json: @item_image
    else
       render json: { errors: @item_image.errors, status: :unprocessable_entity }
    end
  end

  def destroy    
    @section.item_image.find(params[:id]).destroy
    render json: { message: 'item deleted' }
  end

  private

    def find_section
        @section = Section.find(params[:section_id])
    end

    def itemImage_params
      params.require(:item_image).permit(:image, :title, :kind, :description)
    end
end
