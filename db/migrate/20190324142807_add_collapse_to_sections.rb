class AddCollapseToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :sections, :collapse, :boolean
  end
end
