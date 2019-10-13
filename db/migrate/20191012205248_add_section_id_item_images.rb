class AddSectionIdItemImages < ActiveRecord::Migration[5.1]
  def change
  	add_column :item_images, :section_id, :integer
  end
end
