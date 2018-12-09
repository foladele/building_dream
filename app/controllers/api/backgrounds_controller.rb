
require 'pry'

class Api::BackgroundsController < ApplicationController

	def index
    background = Background.all
    render json: background
  end

  def create
    # binding.pry
    background = Background.new(background_params)
    if background.save
      render json: background
    else
      render json: { errors: background.errors, status: :unprocessable_entity }
    end
  end

  def update
    background = Background.find(params[:id])
    # background.update(name: params[:name], color: params[:color])
    if background.update(background_params)
      render json: background
    else
       render json: { errors: background.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    Background.find(params[:id]).destroy
    render json: { message: 'Background deleted' }
  end

  private

  def background_params
    params.require(:background).permit(:name, :color, :image)
  end

end
