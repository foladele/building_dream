require 'pry'
class Api::SectionsController < ApplicationController

  def index
  	@sections = Section.all
    render json: @sections
  end
  

  def create
    # binding.pry
    @section = Section.new(section_params)
    if @section.save
      render json: @section
    else
      render json: { errors: @section.errors, status: :unprocessable_entity }
    end
  end

  def update
    
    @section = Section.find(params[:id])
    # section.update(name: params[:name], color: params[:color])
    if @section.update(section_params)
      render json: @section
    else
       render json: { errors: @section.errors, status: :unprocessable_entity }
    end
  end

  def destroy
    # binding.pry
    Section.find(params[:id]).destroy
    render json: { message: 'Section deleted' }
  end

  private

  def section_params
    # binding.pry
    params.require(:section).permit(:title, :color, :collapse, :kind)
  end

end
