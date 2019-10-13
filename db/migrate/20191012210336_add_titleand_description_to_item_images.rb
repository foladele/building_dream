class AddTitleandDescriptionToItemImages < ActiveRecord::Migration[5.1]
  def change
    add_column :item_images, :title, :string
    add_column :item_images, :description, :string
    add_column :item_images, :kind, :string
  end
end
