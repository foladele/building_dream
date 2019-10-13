class CreateItemTexts < ActiveRecord::Migration[5.1]
  def change
    create_table :item_texts do |t|
      t.integer :item_id

      t.timestamps
    end
  end
end
