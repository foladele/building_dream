require 'pry'
class SectionsController < ApplicationController

  def index
  	section = Section.all
    render json: section
  end

  def show
  end

  def create
    # binding.pry
    section = Section.new(section_params)
    if section.save
      render json: section
    else
      render json: { errors: section.errors, status: :unprocessable_entity }
    end
  end

  def update
    section = Section.find(params[:id])
    # section.update(name: params[:name], color: params[:color])
    if section.update(section_params)
      render json: section
    else
       render json: { errors: section.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    Section.find(params[:id]).destroy
    render json: { message: 'Section deleted' }
  end

  private

  def section_params
    params.require(:section).permit(:title, :color)
  end

end
