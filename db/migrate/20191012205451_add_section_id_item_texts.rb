class AddSectionIdItemTexts < ActiveRecord::Migration[5.1]
  def change
  	add_column :item_texts, :section_id, :integer
  end
end
