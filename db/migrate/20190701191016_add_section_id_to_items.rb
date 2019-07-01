class AddSectionIdToItems < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :section_id, :integer
  end
end
